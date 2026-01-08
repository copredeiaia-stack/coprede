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
    // Adapt snake_case (DB) to camelCase (Frontend)
    return (data || []).map((item: any) => {
        // Handle 'Data Inicio' which might be a timestamp string "1752666900000"
        let dataIso = new Date().toISOString();
        const rawDate = item['Data Inicio'] || item.data || item.Data;

        if (rawDate) {
            // Check if it's a timestamp string (digits only)
            if (/^\d+$/.test(String(rawDate))) {
                dataIso = new Date(Number(rawDate)).toISOString();
            } else {
                dataIso = new Date(rawDate).toISOString();
            }
        }

        return {
            data: dataIso,
            idEvento: item.id || item.idEvento || item.Ticket || 0,

            // Map 'Sintoma' column (e.g., "SEM SINAL") to 'tipoEvento' (Category)
            tipoEvento: item['Sintoma'] || item.tipoEvento || 'N/A',

            // Map 'Abrangencia' or 'Mercado'
            mercado: item['Abrangencia'] || item.mercado || 'N/A',

            natureza: item.natureza || 'Indefinido',

            // Map 'Falha' column (e.g., "Problema HFC") to 'sintoma' (Specific Cause) for the chart
            sintoma: item['Falha'] || item.sintoma || item['Descrição'] || 'N/A',

            cidade: item.cidade || 'N/A',
            grupo: item.grupo || 'N/A',
            equipamento: item.equipamento || 'N/A',
            dataPrev: item['Previsão'] || item.dataPrev || null,
            associados: item.associados || []
        };
    });
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

    // Event Type Data (Now Falhas/Sintomas)
    const eventTypeMap: Record<string, number> = {};
    conteudo.forEach(item => {
        // Use 'sintoma' for Top Falhas, fallback to 'tipoEvento' if missing
        const key = item.sintoma || item.tipoEvento || 'Outros';
        eventTypeMap[key] = (eventTypeMap[key] || 0) + 1;
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
