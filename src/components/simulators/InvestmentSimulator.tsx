import React, { useState, useMemo, useCallback, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChevronDown, ChevronUp, Settings, HelpCircle } from "lucide-react";
import { formatYen, formatBTC } from '../../utils/formatters';
import { DEFAULTS, CURRENT_YEAR, PriceModel } from '../../utils/constants';
import { useInvestmentSimulation, SimulationInputs } from '../../hooks/useInvestmentSimulation';
import LoadingSpinner from '../ui/LoadingSpinner';

const typography = { /* typography definitions from Home.tsx */
    h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    h3: 'text-lg sm:text-xl font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
    tiny: 'text-xs sm:text-sm font-normal',
};

const colors = { /* colors definitions from Home.tsx with adjustments */
    primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    accent: 'bg-amber-500 hover:bg-amber-600 text-white',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
    error: 'text-red-500',
    success: 'text-[#10B981]',
};

const TooltipIcon: React.FC<{ content: React.ReactNode }> = ({ content }) => ( /* TooltipIcon component */
    <div className="group relative inline-block ml-2">
        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-300 cursor-help transition-colors duration-200" />
        <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-gray-300 bg-gray-800 rounded-lg shadow-lg -translate-x-1/2 left-1/2">
            {content}
        </div>
    </div>
);

const InputField: React.FC<{ /* InputField component */
    label: string;
    tooltip?: React.ReactNode;
    error?: string;
    children: React.ReactNode;
}> = ({ label, tooltip, error, children }) => (
    <div className="mb-4">
        <div className="flex items-center mb-1">
            <label className={`${typography.body} ${colors.textSecondary}`}>{label}</label>
            {tooltip && <TooltipIcon content={tooltip} />}
        </div>
        {children}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const TOOLTIPS = { /* TOOLTIPS object */
    initialInvestmentType: "初期投資方法を選択してください。すでに保有しているBTCを指定するか、日本円で投資するかを選べます。",
    initialInvestment: "初期投資額（円）を入力してください。",
    initialBtcHolding: "すでに保有しているビットコインの量（BTC）を入力してください。",
    monthlyInvestment: "毎月積み立てる金額（円）を入力してください。",
    years: "投資を行う期間（年数）を指定します。投資期間が終了した後も2050年まで資産推移を予測します。",
    priceModel: (
        <React.Fragment>
            <p>標準モデル：ビットコインが将来、世界的な基軸通貨として広く採用される「ビットコインスタンダード」の世界を想定しています。パワーロー方程式に基づき、ビットコイン価格は長期的に成長し、<strong>2050年には1BTC=1000万ドル</strong>に到達すると予測します。これは、ビットコインが現在の法定通貨システムを大きく変革し、グローバル経済の中心的な役割を担うシナリオです。</p>
            <p className="mt-2">保守的モデル：ビットコインが「価値の保存手段」として定着するシナリオを想定しています。こちらもパワーロー方程式を基にしていますが、成長曲線を控えめに調整し、より現実的な範囲での価格上昇を見込みます。具体的には、ビットコインの時価総額が金（ゴールド）の4倍程度となり、デジタルゴールドとして確固たる地位を築くと仮定し、<strong>2050年には1BTC=400万ドル</strong>に到達すると予測します。これは、ビットコインが限定的ながらも重要な役割を担うシナリオです。</p>
        </React.Fragment>
    ),
    exchangeRate: "円ドルの為替レートを設定します。",
    inflationRate: "年間の物価上昇率を設定します。",
};


const SimulationResultsTable: React.FC<{ results: any[] }> = ({ results }) => ( /* SimulationResultsTable component */
    <div className={`hidden md:block ${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
        <div className="flex justify-between mb-4">
            <h3 className={`${typography.h3} ${colors.textPrimary}`}>シミュレーション結果</h3>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th className={`${typography.small} px-4 py-3 text-left ${colors.textPrimary} uppercase tracking-wider`}>年</th>
                        <th className={`${typography.small} px-4 py-3 text-right ${colors.textPrimary} uppercase tracking-wider`}>BTC価格</th>
                        <th className={`${typography.small} px-4 py-3 text-right ${colors.textPrimary} uppercase tracking-wider`}>年間積立額</th>
                        <th className={`${typography.small} px-4 py-3 text-right ${colors.textPrimary} uppercase tracking-wider`}>追加BTC量</th>
                        <th className={`${typography.small} px-4 py-3 text-right ${colors.textPrimary} uppercase tracking-wider`}>BTC保有量</th>
                        <th className={`${typography.small} px-4 py-3 text-right ${colors.textPrimary} uppercase tracking-wider`}>資産評価額</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {results.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-750 hover:bg-gray-700 transition-colors duration-200"}>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap ${colors.textPrimary}`}>{result.year}</td>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap text-right ${colors.textPrimary}`}>{formatYen(result.btcPrice, 2)}</td>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap text-right ${colors.textPrimary}`}>{formatYen(result.annualInvestment, 2)}</td>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap text-right ${colors.textPrimary}`}>{formatBTC(result.btcPurchased, 4)}</td>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap text-right ${colors.textPrimary}`}>{formatBTC(result.btcHeld, 4)}</td>
                            <td className={`${typography.body} px-4 py-2 whitespace-nowrap text-right ${colors.textPrimary}`}>{formatYen(result.totalValue, 2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const InvestmentSimulator: React.FC = () => { /* InvestmentSimulator main component */
    const [initialInvestmentType, setInitialInvestmentType] = useState<'btc' | 'jpy'>("btc");
    const [initialInvestment, setInitialInvestment] = useState("");
    const [initialBtcHolding, setInitialBtcHolding] = useState("");
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [years, setYears] = useState("10");
    const [priceModel, setPriceModel] = useState<PriceModel>(PriceModel.STANDARD);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(DEFAULTS.EXCHANGE_RATE.toString());
    const [inflationRate, setInflationRate] = useState(DEFAULTS.INFLATION_RATE.toString());
    const [isCalculating, setIsCalculating] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const { results, errors, simulate } = useInvestmentSimulation();

    const runSimulation = useCallback(() => { /* runSimulation function */
        setIsCalculating(true);
        const inputs: SimulationInputs = {
            initialInvestmentType,
            initialInvestment,
            initialBtcHolding,
            monthlyInvestment,
            years,
            priceModel,
            exchangeRate,
            inflationRate
        };
        setTimeout(() => {
            simulate(inputs);
            setIsCalculating(false);
        }, 500);
    }, [
        initialInvestmentType,
        initialInvestment,
        initialBtcHolding,
        monthlyInvestment,
        years,
        priceModel,
        exchangeRate,
        inflationRate,
        simulate
    ]);


    const chartData = useMemo(() => { /* chartData memoization */
        return results.map(result => ({
            year: result.year,
            btcHeld: result.btcHeld,
            totalValue: result.totalValue,
            isInvestmentPeriod: result.isInvestmentPeriod,
        }));
    }, [results]);

    const toggleGuide = useCallback(() => { /* toggleGuide function */
        setShowGuide(!showGuide);
    }, [showGuide]);


    return ( /* InvestmentSimulator component JSX */
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 min-h-screen text-gray-100 space-y-8">
            <div className={`${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
                <h1 className={`${typography.h1} ${colors.textPrimary} mb-6 flex items-center justify-center`}>
                    <span className="bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">ビットコイン積み立てシミュレーター</span>
                </h1>

                <button
                    onClick={toggleGuide}
                    className={`${colors.secondary} px-4 py-2 rounded-md text-sm mb-4`}
                >
                    {showGuide ? "ガイドを非表示にする" : "使い方を表示"}
                </button>

                {showGuide && (
                    <div className={`${colors.cardBg} p-4 rounded-md mb-6 border border-blue-600`}>
                        <h2 className={`${typography.h2} ${colors.textPrimary} mb-3`}>使い方ガイド</h2>
                        <ol className="list-decimal pl-5">
                            <li className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                <strong>初期設定:</strong> 最初に、初期投資の方法と金額（または保有BTC量）を設定します。
                            </li>
                            <li className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                <strong>積立設定:</strong> 次に、毎月の積立額と積立期間（年数）を設定します。
                            </li>
                            <li className={`${typography.body} ${colors.textSecondary}`}>
                                <strong>シミュレーション実行:</strong> 最後に「シミュレーション実行」ボタンをクリックして、将来の資産推移を確認します。
                            </li>
                        </ol>
                    </div>
                )}


                <section className="mb-6 p-6 rounded-xl shadow-md border border-gray-700">
                    <h2 className={`${typography.h2} ${colors.textPrimary} mb-4`}>初期投資設定</h2>
                    <InputField label="初期投資方法" tooltip={TOOLTIPS.initialInvestmentType}>
                        <div className="flex space-x-4 mt-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-amber-500 focus:ring-amber-500"
                                    name="initialInvestmentType"
                                    value="btc"
                                    checked={initialInvestmentType === "btc"}
                                    onChange={() => setInitialInvestmentType("btc")}
                                />
                                <span className={`${typography.body} ${colors.textSecondary} ml-2`}>すでにBTC保有</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio text-amber-500 focus:ring-amber-500"
                                    name="initialInvestmentType"
                                    value="jpy"
                                    checked={initialInvestmentType === "jpy"}
                                    onChange={() => setInitialInvestmentType("jpy")}
                                />
                                <span className={`${typography.body} ${colors.textSecondary} ml-2`}>日本円で投資</span>
                            </label>
                        </div>
                    </InputField>
                    {initialInvestmentType === "jpy" ? (
                        <InputField label="初期投資額（円）" tooltip={TOOLTIPS.initialInvestment} error={errors.initialInvestment}>
                            <input
                                type="number"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(e.target.value)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                step="1000"
                                placeholder="例: 100000"
                                aria-label="初期投資額（円）"
                            />
                        </InputField>
                    ) : (
                        <InputField label="初期保有BTC" tooltip={TOOLTIPS.initialBtcHolding} error={errors.initialBtcHolding}>
                            <input
                                type="number"
                                value={initialBtcHolding}
                                onChange={(e) => setInitialBtcHolding(e.target.value)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                step="0.00000001"
                                placeholder="例: 0.1"
                                aria-label="初期保有BTC"
                            />
                        </InputField>
                    )}
                </section>

                <section className="mb-6 p-6 rounded-xl shadow-md border border-gray-700">
                    <h2 className={`${typography.h2} ${colors.textPrimary} mb-4`}>積立設定</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="毎月積立額（円）" tooltip={TOOLTIPS.monthlyInvestment} error={errors.monthlyInvestment}>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                                    className="w-full bg-gray-700 p-2 rounded-md text-gray-100 pr-12 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                    step="1000"
                                    placeholder="例: 10000"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">円</span>
                            </div>
                        </InputField>

                        <InputField label="積立年数" tooltip={TOOLTIPS.years} error={errors.years}>
                            <input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                className="w-full bg-gray-700 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                step="1"
                                placeholder="例: 10"
                            />
                        </InputField>
                    </div>
                </section>


                <section className="mb-6 p-6 rounded-xl shadow-md border border-gray-700">
                    <h2 className={`${typography.h2} ${colors.textPrimary} mb-4 flex items-center`}>詳細設定 <span className={`${typography.body} ${colors.textMuted}`}>(オプション)</span>
                        <button
                            className={`ml-2 p-1 rounded-md cursor-pointer transition-colors ${showAdvancedOptions ? 'bg-blue-700' : 'hover:bg-gray-600'}`}
                            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                        >
                            {showAdvancedOptions ? (
                                <ChevronUp size={18} className={colors.textPrimary} />
                            ) : (
                                <ChevronDown size={18} className={colors.textSecondary} />
                            )}
                        </button>
                    </h2>

                    {showAdvancedOptions && (
                        <div className="mt-4 space-y-4 p-4 bg-gray-700 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="価格予測モデル" tooltip={TOOLTIPS.priceModel}>
                                    <select
                                        value={priceModel}
                                        onChange={(e) => setPriceModel(e.target.value as PriceModel)}
                                        className="w-full bg-gray-600 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                    >
                                        <option value={PriceModel.STANDARD}>標準モデル</option>
                                        <option value={PriceModel.CONSERVATIVE}>保守的モデル</option>
                                    </select>
                                </InputField>
                                <InputField label="為替レート (円/USD)" tooltip={TOOLTIPS.exchangeRate} error={errors.exchangeRate}>
                                    <input
                                        type="number"
                                        value={exchangeRate}
                                        onChange={(e) => setExchangeRate(e.target.value)}
                                        className="w-full bg-gray-600 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                        step="0.1"
                                        placeholder="例: 150"
                                    />
                                </InputField>
                                <InputField label="インフレ率 (%)" tooltip={TOOLTIPS.inflationRate} error={errors.inflationRate}>
                                    <input
                                        type="number"
                                        value={inflationRate}
                                        onChange={(e) => setInflationRate(e.target.value)}
                                        className="w-full bg-gray-600 p-2 rounded-md text-gray-100 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all duration-200"
                                        step="0.1"
                                        placeholder="例: 0"
                                    />
                                </InputField>
                            </div>
                        </div>
                    )}
                </section>


                <div className="mt-6">
                    <button
                        onClick={runSimulation}
                        disabled={isCalculating}
                        className={`${colors.accent} w-full p-3 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 shadow-md flex justify-center items-center ${isCalculating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isCalculating ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                計算中...
                            </>
                        ) : (
                            'シミュレーション実行'
                        )}
                    </button>
                </div>

                {errors.simulation && (
                    <div className="mt-4 p-3 bg-red-900 text-gray-100 rounded-md">{errors.simulation}</div>
                )}

                {results.length > 0 && (
                    <div className="mt-8 space-y-6">
                        <div className={`${colors.cardBg} p-6 rounded-xl shadow-md ${colors.cardBorder}`}>
                            <h2 className={`${typography.h2} ${colors.textPrimary} mb-4`}>資産推移</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4A4A5A" />
                                    <XAxis dataKey="year" stroke="#e2e8f0" tick={{ fontSize: 12, fill: '#e2e8f0' }} />
                                    <YAxis
                                        yAxisId="left"
                                        stroke="#34D399"
                                        tickFormatter={(value) => formatBTC(value, 4)}
                                        tick={{ fill: '#e2e8f0' }}
                                        domain={['auto', 'auto']}
                                        label={{
                                            value: 'BTC保有量',
                                            angle: -90,
                                            position: 'insideLeft',
                                            style: { fill: '#34D399', fontSize: 12, fontWeight: 500 }
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#60A5FA"
                                        tickFormatter={(value) => formatYen(value, 2)}
                                        tick={{ fill: '#e2e8f0' }}
                                        domain={['auto', 'auto']}
                                        label={{
                                            value: '資産評価額',
                                            angle: 90,
                                            position: 'insideRight',
                                            style: { fill: '#60A5FA', fontSize: 12, fontWeight: 500 }
                                        }}
                                        width={80}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(26, 32, 44, 0.95)', border: '1px solid rgba(82, 82, 91, 0.8)', borderRadius: '8px' }}
                                        labelStyle={{ color: '#e2e8f0' }}
                                        formatter={(value, name) => {
                                            if (typeof name === 'string') {
                                                if (name === "btcHeld") return [formatBTC(value as number, 4), "BTC保有量"];
                                                if (name === "totalValue") return [formatYen(value as number, 2), "資産評価額"];
                                            }
                                            return [value, name];
                                        }}
                                    />
                                    <Legend wrapperStyle={{ color: '#e2e8f0' }} verticalAlign="top" height={36} />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="btcHeld"
                                        name="BTC保有量"
                                        stroke="#34D399"
                                        dot={false}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="totalValue"
                                        name="資産評価額"
                                        stroke="#60A5FA"
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>


                        <div className={`block md:hidden ${colors.cardBg} p-4 rounded-xl shadow-md space-y-3`}>
                            <h3 className={`${typography.h3} ${colors.textPrimary} mb-2`}>ハイライト</h3>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className={`${typography.small} ${colors.textMuted}`}>初期投資額</div>
                                <div className={`${typography.body} ${colors.textPrimary}`}>
                                    {initialInvestmentType === "jpy"
                                        ? formatYen(parseFloat(initialInvestment) || 0, 2)
                                        : formatBTC(parseFloat(initialBtcHolding) || 0, 4)}
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className={`${typography.small} ${colors.textMuted}`}>月額積立金</div>
                                <div className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatYen(parseFloat(monthlyInvestment) || 0, 2)}
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className={`${typography.small} ${colors.textMuted}`}>5年後の資産</div>
                                <div className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatYen(
                                        results.find(r => r.year === CURRENT_YEAR + 5)?.totalValue || 0,
                                        2
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className={`${typography.small} ${colors.textMuted}`}>10年後の資産</div>
                                <div className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatYen(
                                        results.find(r => r.year === CURRENT_YEAR + 10)?.totalValue || 0,
                                        2
                                    )}
                                </div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-md">
                                <div className={`${typography.small} ${colors.textMuted}`}>シミュレーション終了時の資産</div>
                                <div className={`${typography.body} ${colors.textPrimary}`}>
                                    {formatYen(results[results.length - 1]?.totalValue || 0, 2)}
                                </div>
                            </div>
                        </div>


                        <SimulationResultsTable
                            results={results}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvestmentSimulator;