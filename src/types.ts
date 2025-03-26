export interface PriceData {
    usd: number;
    jpy: number;
}

export interface CurrentPrice {
    prices: PriceData;
    timestamp: string;
    source?: string;
}

export interface PowerLawDataPoint {
    date: number;
    price: number | null;
    medianModel: number;
    supportModel: number;
    isFuture: boolean;
    daysSinceGenesis: number;
}

export interface WeeklyPrice {
    date: string;
    price: number;
}

export interface DailyPrice {
    date: string;
    price: number;
}

export interface BitcoinData {
    loading: boolean;
    error: Error | null;
    currentPrice: CurrentPrice | null;
    dailyPrices: DailyPrice[];
    weeklyPrices: WeeklyPrice[];
    powerLawData: PowerLawDataPoint[];
    dailyPowerLawData: PowerLawDataPoint[];
    exchangeRate: number;
    rSquared: number | null;
    dataSources: { currentPrice?: string; dailyPrices?: string; weeklyPrices?: string };
}

export interface DataContainerProps {
    children: React.ReactNode;
    isLoading: boolean;
    error: Error | null;
    loadingMessage: string;
    noDataMessage: string;
    className?: string;
}

export interface PowerLawChartProps {
    exchangeRate: number;
    rSquared: number | null; // 修正: nullを許容
    chartData: PowerLawDataPoint[];
    currentPrice?: number; // オプションに変更
    height?: number;
    xAxisScale?: 'linear' | 'log';
    yAxisScale?: 'linear' | 'log';
    showRSquared?: boolean;
    chartTitle?: string;
    isLogScale?: boolean;
}

export interface PowerLawChartWrapperProps {
    rSquared: number | null; // 修正: nullを許容
    chartData: PowerLawDataPoint[];
    exchangeRate: number;
    height: number;
    isLogScale: boolean;
    xAxisScale?: 'linear' | 'log';
    yAxisScale?: 'linear' | 'log';
}