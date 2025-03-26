import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import PowerLawChartWrapper from '../components/charts/PowerLawChartWrapper';
import { useBitcoinData } from '../hooks/useBitcoinData';

const typography: Record<string, string> = {
    h1: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h2: 'text-xl sm:text-2xl font-medium',
    subtitle: 'text-base sm:text-lg font-medium',
    body: 'text-sm sm:text-base font-normal',
    small: 'text-xs sm:text-sm font-normal',
};

const colors: Record<string, string> = {
    primary: 'bg-[#3B82F6] hover:bg-[#2b6cb0] text-white',
    secondary: 'bg-[#F59E0B] hover:bg-[#d97706] text-black',
    cardBg: 'bg-gray-800',
    cardBorder: 'border border-gray-700',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textMuted: 'text-gray-400',
};

const PowerLawExplanation: React.FC = () => {
    const { loading, error, powerLawData, exchangeRate, rSquared } = useBitcoinData();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-4`}>
                        パワーローとは？
                    </h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコインの価格が長期的にどう動くのか、自然の法則から予測する手法を解説します。
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center mt-4 text-[#3B82F6] hover:text-[#2b6cb0] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> ホームに戻る
                    </Link>
                </header>

                <section id="what-is-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2" />
                        成長の法則
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーロー（べき乗則）は、自然や社会で見られる成長の法則です。ある値が時間や規模の「べき乗」に比例して増えることを指します。
                        </p>
                        <p>
                            たとえば、都市の人口分布を考えてみてください。大都市は少なく、小さな町は多い。このようなパターンがパワーローです。地震の規模やインターネット上の人気も同様の傾向を示します。
                        </p>
                        <p>
                            ビットコインの価格にもこの法則が当てはまり、長期的な成長を理解する手がかりになります。
                        </p>
                    </div>
                </section>

                <section id="bitcoin-power-law" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        ビットコインとパワーロー
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            ビットコインは2009年の誕生以来、驚異的な成長を遂げています。2010年には1BTCが0.05ドル程度だったものが、2025年現在では数万ドルに達しました。
                        </p>
                        <p>
                            物理学者のGiovanni Santostasiは、ビットコインの価格が「時間の6乗」に比例して成長すると指摘しています。これは、利用者が増えるほど価値が上がり（メトカーフの法則）、マイニングの難易度調整や安全性がさらなる利用者を引き込む循環によるものです。
                        </p>
                        <p>
                            この理論では、ビットコインは単なる金融資産ではなく、ネットワーク効果によって成長する「デジタル都市」のような存在とされています。
                        </p>
                    </div>
                </section>

                <section id="power-law-chart" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        パワーローチャートの種類
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            ビットコインの価格成長を視覚化するには、パワーローチャートが役立ちます。ここでは2つのタイプを紹介します。
                        </p>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>
                                対数スケールチャート
                            </h3>
                            <p>
                                対数スケールチャートは、Y軸（価格）を対数で表し、X軸（時間）は通常の線形スケールで表示します。価格が急激に上昇するビットコインのようなデータを扱う際、対数スケールを使うと、過去の小さな値動きと現在の大きな値動きを同じグラフ上で見やすくできます。
                            </p>
                            <p>
                                たとえば、0.1ドルから10万ドルへの上昇が直線的なグラフでは見づらいですが、対数スケールでは自然な曲線として捉えられます。以下は対数スケールでの表示例です。
                            </p>
                            {loading ? (
                                <p>読み込み中...</p>
                            ) : error ? (
                                <p>データの取得に失敗しました。</p>
                            ) : (
                                <PowerLawChartWrapper
                                    chartData={powerLawData}
                                    exchangeRate={exchangeRate}
                                    rSquared={rSquared}
                                    height={300}
                                    isLogScale={false} // X軸: 線形, Y軸: 対数
                                    xAxisScale="linear"
                                    yAxisScale="log"
                                />
                            )}
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>
                                対数-対数スケールチャート
                            </h3>
                            <p>
                                対数-対数スケールチャートは、X軸（時間）とY軸（価格）の両方を対数で表します。この方法では、パワーローの成長が直線として現れるのが特徴です。ビットコインの価格が時間のべき乗に比例するという理論を視覚的に確認するのに適しています。
                            </p>
                            <p>
                                たとえば、時間の経過（2009年からの日数）と価格の関係が直線的に見えることで、長期的な成長パターンが明確になります。以下は対数-対数スケールでの表示例です。
                            </p>
                            {loading ? (
                                <p>読み込み中...</p>
                            ) : error ? (
                                <p>データの取得に失敗しました。</p>
                            ) : (
                                <PowerLawChartWrapper
                                    chartData={powerLawData}
                                    exchangeRate={exchangeRate}
                                    rSquared={rSquared}
                                    height={300}
                                    isLogScale={true} // X軸: 対数, Y軸: 対数
                                    xAxisScale="log"
                                    yAxisScale="log"
                                />
                            )}
                        </div>
                        <p>
                            これらのチャートでは、「中央価格」（長期的な予測値）と「下限価格」（過去の底値ライン）が示されます。対数スケールは価格の変化を捉えやすく、対数-対数スケールはパワーローの理論的な裏付けを強調します。
                        </p>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>
                                決定係数（R²）とは？
                            </h3>
                            <p>
                                チャート右上に表示される「R²」は決定係数と呼ばれ、パワーローモデルが過去の価格データをどれだけ正確に説明できるかを示す数値です。0から1の範囲で表され、1に近いほどモデルが実際のデータに良く当てはまっていることを意味します。
                            </p>
                            <p>
                                たとえば、R²が0.93なら、過去の価格変動の約93%がこのモデルで説明できるということ。高い値は、長期的な予測の信頼性が高いことを示唆しますが、未来を完全に予測するものではない点に注意が必要です。
                            </p>
                        </div>
                    </div>
                </section>

                <section id="investment-application" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2" />
                        投資への活用
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローチャートを活用すれば、ビットコイン投資のタイミングを見極める手助けになります。Harold Christopher Burgerは、価格の「成長回廊」を提案しています。
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <span className="font-medium text-teal-300">下限価格での購入:</span> 過去データで底値とされるラインに近づいた時、リスクが低い可能性があります。
                            </li>
                            <li>
                                <span className="font-medium text-teal-300">中央価格での積み立て:</span> 短期変動に左右されず、長期的な成長を見据えた投資に適しています。
                            </li>
                        </ul>
                        <p>
                            NISAなどを活用している方なら、ビットコインも長期視点で少額から積み立てる戦略が合うかもしれません。
                        </p>
                    </div>
                    <div className="mt-4 text-right">
                        <Link
                            to="/simulators/investment"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            シミュレーションを試す{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </section>

                <section id="limitations" className={`${colors.cardBg} rounded-xl p-6 mb-8 shadow-lg`}>
                    <h2 className={`${typography.h2} text-[#3B82F6] mb-4 flex items-center`}>
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        パワーローの限界
                    </h2>
                    <div className={`${typography.body} ${colors.textSecondary} space-y-4`}>
                        <p>
                            パワーローは長期予測に適していますが、短期的な価格変動には対応できません。また、法律や技術の大きな変化があれば予測が外れる可能性もあります。
                        </p>
                        <p>
                            成長が無限に続くわけではなく、いつか落ち着く可能性も考慮が必要です。ニュースや他の分析と組み合わせることが重要です。
                        </p>
                    </div>
                </section>

                <footer className="text-center text-gray-400 mt-12 py-4 border-t border-gray-800">
                    <p>
                        © {new Date().getFullYear()} ビットコイン長期投資ラボ{' '}
                        <a href="https://x.com/DrPowerLaw" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-[#2b6cb0]">
                            @DrPowerLaw
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default PowerLawExplanation;