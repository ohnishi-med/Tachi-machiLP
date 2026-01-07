import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // URLに患者データが含まれる場合、即座にアプリへリダイレクトする
        // 本番環境構成に合わせて /app のパス調整が必要になる可能性がありますが、
        // 基本的に同ドメイン配下の /app を想定しています。
        const params = new URLSearchParams(location.search);
        if (params.has('patientName') || params.has('diagnosis')) {
            // 同じドメインの /app にクエリパラメータ付きで飛ばす
            window.location.href = '/app' + location.search;
        }
    }, [location]);

    const handleStart = () => {
        window.location.href = '/app';
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* ヒーローセクション */}
            <header className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-24 lg:pb-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
                            書類、<span className="text-teal-500">タチマチ</span>終わり。
                        </h1>
                        <p className="mt-4 text-xl md:text-2xl text-slate-600 font-medium mb-10 max-w-2xl mx-auto">
                            時間のかかってしまう診断書や紹介状の作成をサポート。<br />
                            医療文書作成アシスタント「タチマチ」
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={handleStart}
                                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                            >
                                今すぐ始める
                            </button>
                        </div>

                        {/* Visual Placeholder */}
                        <div className="mt-16 p-4 bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="h-4 bg-slate-100 rounded-t-lg mb-4 flex items-center space-x-2 px-3">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="space-y-4 p-4 text-left">
                                <div className="h-8 w-1/3 bg-slate-100 rounded"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-10 bg-slate-50 rounded border border-slate-100"></div>
                                    <div className="h-10 bg-slate-50 rounded border border-slate-100"></div>
                                </div>
                                <div className="h-32 bg-slate-50 rounded border border-slate-100"></div>
                                <div className="h-10 w-1/4 bg-teal-500 rounded opacity-20"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-teal-100 rounded-full blur-3xl opacity-30"></div>
                    <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-white relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">なぜ、タチマチなのか？</h2>
                        <p className="text-lg text-slate-600">医療現場のニーズに応える、3つの特長。</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            {
                                title: '超高速作成',
                                desc: '定型文や過去の履歴を活用し、数クリックで文書が完成。手入力を極限まで減らします。',
                                icon: (
                                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                )
                            },
                            {
                                title: 'セキュア＆ローカル',
                                desc: '患者データはサーバーに送信されず、お使いのブラウザ内だけで完結。セキュリティも安心です。',
                                icon: (
                                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                )
                            },
                            {
                                title: 'デジカル連携',
                                desc: 'm3デジカルの画面からワンタッチで情報を転記。転記ミスや確認の手間をゼロに。',
                                icon: (
                                    <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                                )
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100">
                                <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Usage Section */}
            <section className="py-24 bg-slate-50 relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">使い方はシンプル</h2>
                        <p className="text-lg text-slate-600">3つのステップで、書類作成を完了。</p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Line connecting steps */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>

                            <div className="space-y-12">
                                {/* Step 1 */}
                                <div className="relative flex flex-col md:flex-row items-center justify-between">
                                    <div className="order-2 md:order-1 w-full md:w-5/12 p-6 bg-white rounded-xl shadow-md text-right md:text-right text-center">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">1. デジカルから連携</h3>
                                        <p className="text-slate-600">電子カルテ画面でブックマークレットをクリック。患者情報を自動で取得します。</p>
                                    </div>
                                    <div className="order-1 md:order-2 z-10 flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white font-bold shadow-lg mb-4 md:mb-0">1</div>
                                    <div className="order-3 md:order-3 w-full md:w-5/12 hidden md:block"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex flex-col md:flex-row items-center justify-between">
                                    <div className="order-3 md:order-1 w-full md:w-5/12 hidden md:block"></div>
                                    <div className="order-1 md:order-2 z-10 flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white font-bold shadow-lg mb-4 md:mb-0">2</div>
                                    <div className="order-2 md:order-3 w-full md:w-5/12 p-6 bg-white rounded-xl shadow-md text-left md:text-left text-center">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">2. 文書を選択・入力</h3>
                                        <p className="text-slate-600">紹介状や診断書を選び、必要な項目を入力。自動入力された情報はそのまま使えます。</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex flex-col md:flex-row items-center justify-between">
                                    <div className="order-2 md:order-1 w-full md:w-5/12 p-6 bg-white rounded-xl shadow-md text-right md:text-right text-center">
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">3. PDF出力</h3>
                                        <p className="text-slate-600">ボタン一つでPDFを作成。あとは印刷してサインするだけ。</p>
                                    </div>
                                    <div className="order-1 md:order-2 z-10 flex items-center justify-center w-10 h-10 bg-teal-500 rounded-full text-white font-bold shadow-lg mb-4 md:mb-0">3</div>
                                    <div className="order-3 md:order-3 w-full md:w-5/12 hidden md:block"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-16">
                        <button
                            onClick={handleStart}
                            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        >
                            まずは使ってみる
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="font-medium text-lg mb-2">タチマチ</p>
                    <p className="text-sm opacity-60">&copy; 2026 Antigravity. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
