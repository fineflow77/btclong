import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, Shield, TrendingUp, Key, PiggyBank } from 'lucide-react';

// Typography and color definitions (unchanged)
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
    accent: 'text-[#D4AF37]',
    success: 'text-[#10B981]',
    warning: 'text-[#F87171]',
};

const BitcoinBasics: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a202c] to-[#2d3748] text-gray-100">
            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
                {/* Introduction */}
                <div className="text-center">
                    <h1 className={`${typography.h1} text-[#3B82F6] mb-4`}>はじめてのビットコイン投資ガイド</h1>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        ビットコイン投資に興味があるけれど、何から始めたら良いか分からない...？
                        このガイドでは、初心者の方でも安心してビットコイン投資を始められるよう、基本知識から実践的なステップまで、丁寧に解説します。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        少額から始められるビットコイン投資の世界へ、一緒に踏み出しましょう！
                    </p>
                </div>

                {/* Section 1: What is Bitcoin? */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Info className="h-5 w-5 mr-2 ${colors.accent}" />
                        ビットコインとは？ - デジタル時代の新しい資産
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコインは、政府や中央銀行のような特定の管理主体を持たない、世界初の分散型デジタル通貨です。インターネットを通じて、世界中のどこへでも、誰とでも、直接送金できます。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        従来の通貨と異なり、発行上限が2100万BTCと定められているため、希少性が高く、インフレに強い資産としても注目されています。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary}`}>
                        誕生から10年以上が経過し、長期的な価格上昇を続けていることから、分散投資の選択肢としても魅力的です。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/power-law-explanation"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            ビットコインの長期的な成長の秘密 - パワーローモデルとは？{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Section 2: Benefits and Risks */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <TrendingUp className="h-5 w-5 mr-2 ${colors.accent}" />
                        ビットコイン投資のメリットとリスク - 正しい知識で判断を
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> メリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">長期的な成長性:</strong> 過去10年で価格は大きく上昇しており、将来性への期待も高い。</li>
                                <li><strong className="font-semibold">インフレ対策:</strong> 発行上限があるため、法定通貨のインフレに対するヘッジとして有効。</li>
                                <li><strong className="font-semibold">分散投資:</strong> 株式や債券とは異なる値動きをするため、ポートフォリオのリスク分散に貢献。</li>
                                <li><strong className="font-semibold">少額から投資可能:</strong> 1円からでも購入できるため、初心者でも気軽に始めやすい。</li>
                                <li><strong className="font-semibold">24時間365日取引可能:</strong> いつでも取引できるため、機会を逃しにくい。</li>
                                <li><strong className="font-semibold">グローバルな送金:</strong> 世界中の誰とでも、迅速かつ低コストで送金が可能。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> リスク
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">価格変動の大きさ (ボラティリティ):</strong> 価格変動が非常に大きく、短期間で大きく資産を減らす可能性も。</li>
                                <li><strong className="font-semibold">規制リスク:</strong> 各国政府の規制変更により、価格が大きく変動する可能性や、取引が制限される可能性も。</li>
                                <li><strong className="font-semibold">セキュリティリスク:</strong> ハッキングや盗難のリスクがあり、自己責任での管理が重要。取引所やウォレットのセキュリティ対策をしっかりと行う必要あり。</li>
                                <li><strong className="font-semibold">税金:</strong> ビットコインの取引で得た利益は課税対象。確定申告が必要になる場合がある。</li>
                                <li><strong className="font-semibold">カストディリスク:</strong> 取引所に預けているビットコインは、取引所のリスクに晒される。自己管理型ウォレットでの保管も検討が必要。</li>
                                <li><strong className="font-semibold">情報不足・誤情報:</strong> 市場が比較的新しく、情報が錯綜している。誤った情報に惑わされないように注意が必要。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 3: Preparation */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Shield className="h-5 w-5 mr-2 ${colors.accent}" />
                        準備 - ビットコイン投資を始めるために
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資を始めるには、いくつかの準備が必要です。安全に取引を始めるために、以下のステップを確認しましょう。
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>ウォレットの準備</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                ビットコインを保管するためのウォレットを用意します。ウォレットには大きく分けて2種類あります。
                            </p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">取引所提供のウォレット:</strong> 取引所が提供するウォレットは手軽に利用できますが、取引所のリスクに晒される可能性があります。</li>
                                <li><strong className="font-semibold">自己管理型ウォレット:</strong> MetaMask, Ledger などのウォレットは、秘密鍵を自分で管理するためセキュリティが高いですが、管理には注意が必要です。</li>
                            </ul>
                            <p className={`${typography.body} ${colors.textMuted}`}>
                                初心者の方は、まず取引所提供のウォレットから始めるのがおすすめです。
                            </p>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>取引所アカウントの開設</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                日本国内の暗号資産取引所でアカウントを開設します。金融庁に登録済みの取引所を選びましょう。
                            </p>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                おすすめの取引所:
                            </p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><Link to="https://coin.z.com/jp/" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group"><strong className="font-semibold">GMOコイン</strong><ArrowRight className="ml-1 h-4 w-4" /></Link>: 手数料が安く、セキュリティも高い。積み立てサービスも充実。</li>
                                <li><Link to="https://bitbank.cc/" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group"><strong className="font-semibold">bitbank</strong><ArrowRight className="ml-1 h-4 w-4" /></Link>: 取引量が多く、本格的な取引をしたい方におすすめ。</li>
                            </ul>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                口座開設には、本人確認書類とマイナンバーが必要になります。各取引所のウェブサイトで手順を確認してください。
                            </p>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>セキュリティ対策</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                セキュリティ対策は非常に重要です。必ず以下の設定を行いましょう。
                            </p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">二段階認証 (2FA) の設定:</strong> ログイン時のセキュリティを大幅に向上させます。</li>
                                <li><strong className="font-semibold">複雑なパスワードの設定:</strong> 推測されにくい、英数字と記号を組み合わせたパスワードを設定しましょう。</li>
                                <li><strong className="font-semibold">フィッシング詐欺への注意:</strong> 不審なメールやリンクには注意し、公式ウェブサイトからのみアクセスしましょう。</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Section 4: Using Accumulation Services */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <PiggyBank className="h-5 w-5 mr-2 ${colors.accent}" />
                        積み立てサービスを活用する - 長期投資の効果的なアプローチ
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資初心者の方におすすめなのが、積み立てサービスの活用です。
                        毎日、毎週、毎月など、定期的に一定額を自動で購入してくれるため、手間なく長期的な投資を始められます。
                    </p>
                    <div className="space-y-4">
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.success} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] mr-2" /> 積み立て投資のメリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">ドル・コスト平均法:</strong> 価格変動リスクを軽減し、長期的に安定した投資が期待できます。価格が高い時は少なく、低い時は多く購入するため、平均購入単価を抑える効果があります。</li>
                                <li><strong className="font-semibold">時間分散:</strong> 購入時期を分散することで、市場のタイミングを計る難しさから解放されます。</li>
                                <li><strong className="font-semibold">感情的な判断の排除:</strong> 自動的に購入されるため、感情的な колебанияに左右されず、計画的な投資を続けられます。</li>
                                <li><strong className="font-semibold">手間いらず:</strong> 一度設定すれば自動的に積み立てが行われるため、忙しい方でも手軽に投資を継続できます。</li>
                                <li><strong className="font-semibold">長期的な視点の育成:</strong> 短期的な価格変動に一喜一憂せず、長期的な資産形成を目指す投資 подходを身につけられます。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.warning} mb-2 flex items-center`}>
                                <span className="inline-block w-2 h-2 rounded-full bg-[#F87171] mr-2" /> 積み立て投資のデメリット
                            </h3>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><strong className="font-semibold">手数料が割高な場合がある:</strong> 積み立てサービスは、販売所形式での取引となることが多く、取引所形式に比べて手数料がやや高めに設定されている場合があります。</li>
                                <li><strong className="font-semibold">短期的な利益を追求しにくい:</strong> 価格が短期間で急上昇した場合、一括投資に比べて利益が少なくなる可能性があります。</li>
                                <li><strong className="font-semibold">サービス提供取引所に依存する:</strong> 利用する取引所のサービス内容や手数料体系に依存します。</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`${typography.subtitle} ${colors.textPrimary} mb-2`}>積み立てサービス提供取引所</h3>
                            <p className={`${typography.body} ${colors.textSecondary} mb-2`}>
                                多くの国内取引所が積み立てサービスを提供しています。
                            </p>
                            <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside`}>
                                <li><Link to="https://coin.z.com/jp/stacking/" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group"><strong className="font-semibold">GMOコイン 積立</strong><ArrowRight className="ml-1 h-4 w-4" /></Link>: 毎日積み立て、毎月積み立てなど、柔軟なプランが豊富。</li>
                                <li><Link to="https://bitbank.cc/lp/monthly-tutelate" target="_blank" className="text-[#3B82F6] hover:text-[#2b6cb0] inline-flex items-center group"><strong className="font-semibold">bitbank かんたん積立</strong><ArrowRight className="ml-1 h-4 w-4" /></Link>: シンプルな設定で、自動的に積み立てが可能。</li>
                            </ul>
                            <p className={`${typography.body} ${colors.textMuted}`}>
                                各取引所のサービス内容を比較して、ご自身に合った積み立てサービスを選びましょう。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 5: Starting with Small Investments */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4 flex items-center`}>
                        <Key className="h-5 w-5 mr-2 ${colors.accent}" />
                        少額投資から始める - リスクを抑えた最初のステップ
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資は、少額から始めるのが堅実です。まずは、無理のない範囲で少額投資を体験してみましょう。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        例えば、 <strong className="font-semibold">月々5,000円</strong> や <strong className="font-semibold">毎日500円</strong> といった少額から積み立て投資を始めることができます。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        積み立てサービスを利用すれば、自動的に購入できるため、手間もかかりません。
                    </p>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        最初は少額から投資を始め、徐々に投資額を増やしていくなど、ご自身のペースに合わせて投資戦略を調整していくのがおすすめです。
                    </p>
                    <div className="mt-5 text-right">
                        <Link
                            to="/simulators/investment"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            積み立てシミュレーションで投資のイメージをつかむ{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Section 6: Next Steps */}
                <div className={`${colors.cardBg} p-6 rounded-2xl shadow-md ${colors.cardBorder}`}>
                    <h2 className={`${typography.h2} ${colors.accent} mb-4`}>次のステップ - 学びを深め、投資を発展させる
                    </h2>
                    <p className={`${typography.body} ${colors.textSecondary} mb-3`}>
                        ビットコイン投資を始めたら、継続的に学習を続け、投資戦略を磨いていきましょう。
                    </p>
                    <ul className={`${typography.body} ${colors.textSecondary} list-disc list-inside space-y-2`}>
                        <li><strong className="font-semibold">シミュレーターの活用:</strong> <Link to="/simulators/investment" className="text-[#3B82F6] hover:text-[#2b6cb0]">積み立てシミュレーター</Link> を活用して、長期的な投資戦略の効果を検証してみましょう。</li>
                        <li><strong className="font-semibold">長期投資の重要性:</strong> 短期的な価格変動に惑わされず、長期的な視点でビットコインの成長を見守りましょう。</li>
                        <li><strong className="font-semibold">情報収集の継続:</strong> ビットコインに関する最新情報を継続的に収集し、知識をアップデートし続けましょう。</li>
                        <li><strong className="font-semibold">コミュニティへの参加:</strong> <Link to="/analysis-news" className="text-[#3B82F6] hover:text-[#2b6cb0]">最新ニュースや分析</Link> をチェックしたり、コミュニティに参加して、他の投資家と情報交換することも有益です。</li>
                        <li><strong className="font-semibold">リスク管理の徹底:</strong> 投資には常にリスクが伴います。余剰資金での投資を心がけ、無理な投資は避けましょう。</li>
                    </ul>
                    <div className="mt-5 text-right">
                        <Link
                            to="/analysis-news"
                            className="text-[#3B82F6] hover:text-[#2b6cb0] text-sm font-medium inline-flex items-center group"
                        >
                            最新のビットコインニュースと市場分析を見る{' '}
                            <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                                →
                            </span>
                        </Link>
                    </div>
                </div>

                {/* CTA: Simulator Link */}
                <div className="text-center mt-10">
                    <p className={`${typography.body} ${colors.textSecondary} mb-4`}>
                        さあ、あなたもビットコイン投資の世界へ踏み出しましょう。
                    </p>
                    <Link
                        to="/simulators/investment"
                        className={`${colors.primary} px-6 py-3 rounded-full text-sm font-medium inline-flex items-center transition-colors`}
                    >
                        積み立てシミュレーションを試してみる
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BitcoinBasics;