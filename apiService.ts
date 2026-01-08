import { supabase } from './supabaseClient';

export interface ApiIncident {
    data: string;
    idEvento: number;
    tipoEvento: string;
    mercado: string;
    natureza: string;
    sintoma: string;
    cidade: string;
    grupo: string;
    equipamento: string;
    dataPrev: string | null;
    associados: any;
}

export interface DashboardMetrics {
    total: number;
    pending: number;
    treated: number;
    efficiency: string;
    evolutionData: { time: string; val: number }[];
    techData: { name: string; value: number; color: string }[];
    recentIncidents: any[];
    availableMarkets: string[];
    availableStatuses: string[];
}

// Legacy API URL removed in favor of Supabase
// const API_URL = 'http://201.55.232.150/api/relatorios/acompanhamentoCentralizado/tabela-analitica-extracao?loginUsuario=N0057998';

export const fetchRawIncidents = async (): Promise<ApiIncident[]> => {
    const { data, error } = await supabase
        .from('Newmonitor')
        .select('*');

    if (error) {
        console.error('Supabase Fetch Error:', error);
        throw new Error('Falha ao carregar dados do Supabase');
    }

    // Adapt snake_case (DB) to camelCase (Frontend)
    // We try both to be robust against schema variations
    return (data || []).map((item: any) => ({
        data: item.data || item.Data || new Date().toISOString(), // Fallback if missing
        idEvento: item.idEvento || item.id_evento || item.Ticket || 0,
        tipoEvento: item.tipoEvento || item.tipo_evento || item.TipoEvento || 'N/A',
        mercado: item.mercado || item.Mercado || 'N/A',
        natureza: item.natureza || item.Natureza || 'Indefinido',
        sintoma: item.sintoma || item.Sintoma || 'N/A',
        cidade: item.cidade || item.Cidade || 'N/A',
        grupo: item.grupo || item.Grupo || item.Cluster || 'N/A',
        equipamento: item.equipamento || item.Equipamento || 'N/A',
        dataPrev: item.dataPrev || item.data_prev || null,
        associados: item.associados || []
    }));
};

export const calculateMetrics = (conteudo: ApiIncident[]): DashboardMetrics => {
    const total = conteudo.length;
    const pending = conteudo.filter(i => !i.dataPrev).length;
    const treated = total - pending;
    const efficiency = total > 0 ? `${Math.round((treated / total) * 100)}%` : '0%';

    // Evolution Data
    const evolutionMap: Record<string, number> = {};
    conteudo.forEach(item => {
        const hour = item.data.split('T')[1]?.substring(0, 2) + ':00' || '00:00';
        evolutionMap[hour] = (evolutionMap[hour] || 0) + 1;
    });

    const evolutionData = Object.entries(evolutionMap)
        .map(([time, val]) => ({ time, val }))
        .sort((a, b) => a.time.localeCompare(b.time));

    // Event Type Data
    const eventTypeMap: Record<string, number> = {};
    conteudo.forEach(item => {
        eventTypeMap[item.tipoEvento] = (eventTypeMap[item.tipoEvento] || 0) + 1;
    });

    const colors = ['#e0062e', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];
    const techData = Object.entries(eventTypeMap)
        .map(([name, count], index) => ({
            name,
            value: Math.round((count / total) * 100),
            color: colors[index % colors.length]
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    const recentIncidents = conteudo.slice(0, 4).map(i => ({
        id: `INC-${i.idEvento}`,
        title: i.tipoEvento,
        location: `${i.cidade} - ${i.mercado}`,
        time: i.data.split('T')[1]?.substring(0, 5),
        status: i.natureza.toLowerCase().includes('prejuizo') ? 'critical' : 'pending',
        type: i.sintoma
    }));

    const availableMarkets = Array.from(new Set(conteudo.map(i => i.mercado))).sort();
    const availableStatuses = ['Todos', 'Pendentes', 'Tratadas'];

    return {
        total,
        pending,
        treated,
        efficiency,
        evolutionData,
        techData,
        recentIncidents,
        availableMarkets,
        availableStatuses
    };
};

export const fetchNewMonitor = async () => {
    try {
        const response = await fetch('https://newmonitor.claro.com.br/json/outage.php');
        if (!response.ok) throw new Error('NewMonitor API error');
        return await response.json();
    } catch (e) {
        console.error('NewMonitor Fetch Error:', e);
        return [];
    }
};

export const fetchSGO = async () => {
    try {
        const response = await fetch('http://10.29.5.216/scr/sgo_incidentes_abertos.php');
        if (!response.ok) throw new Error('SGO API error');
        return await response.json();
    } catch (e) {
        console.error('SGO Fetch Error (Internal IP):', e);
        return [];
    }
};
