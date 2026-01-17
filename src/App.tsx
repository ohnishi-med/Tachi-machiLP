import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FeaturePlanImage from './assets/feature-plan.png';
import FeatureScheduleImage from './assets/feature-schedule.png';
import HeroCompositeImage from './assets/hero-doctor-composite.png';
import DemoVideo from './assets/demo.mp4';

// ... (existing imports)

// ... (inside component)

{/* Image Side */ }
<div className="lg:w-1/2 relative">
    <div className="rounded-xl shadow-xl border border-slate-200 bg-slate-50 overflow-hidden relative z-10">
        <img
            src={FeaturePlanImage}
            alt="生活習慣病療養計画書作成画面"
            className="w-full h-auto"
        />
    </div>
    {/* Schedule Image Overlay */}
    <div className="absolute -bottom-12 -right-4 w-3/4 rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden z-20 transform rotate-2 hover:rotate-0 transition-transform duration-500 hidden md:block">
        <img
            src={FeatureScheduleImage}
            alt="年間検査計画表"
            className="w-full h-auto"
        />
    </div>
</div>

const LandingPage: React.FC = () => {
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
            <header className="relative overflow-hidden bg-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Left Column: Text */}
                        <div className="lg:w-1/2 text-center lg:text-left z-20">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                                書類、<span className="text-teal-500">タチマチ</span>終わり。
                            </h1>
                            <p className="mt-4 text-xl text-slate-600 font-medium mb-8 leading-relaxed">
                                プレビューを見ながらの直感的な編集。<br />
                                ワンクリックで紹介先の住所まで入力。<br />
                                <span className="font-bold text-slate-800 bg-teal-100 px-1">住所を検索する手間はもういりません。</span>
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                                <button
                                    onClick={handleStart}
                                    className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer"
                                >
                                    今すぐ始める
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Image Composition */}
                        <div className="lg:w-1/2 relative z-10">
                            <div className="relative rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                {/* Composite Image */}
                                <img
                                    src={HeroCompositeImage}
                                    alt="診療風景とタチマチ画面"
                                    className="w-full h-auto object-cover"
                                />

                                {/* Badge */}
                                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    現場の様子
                                </div>
                            </div>
                            {/* Decorative background blob */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-100 rounded-full blur-3xl opacity-40 -z-10"></div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Feature Highlight Section (Plan) */}
            <section className="py-24 bg-white relative z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                        {/* Text Side */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                矛盾のない<span className="text-blue-600">療養計画書</span>を、<br />一瞬で。
                            </h2>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                過去の療養計画書と一致した、矛盾のない計画書が作成可能です。<br />
                                併せて治療計画も設定し、年間の検査計画も分かりやすく提示できます。
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-slate-700">過去データとの整合性を自動チェック</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-slate-700">検査・治療計画を一括管理</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    <span className="text-slate-700">患者さんにも分かりやすいアウトプット</span>
                                </li>
                            </ul>
                        </div>

                        {/* Image Side */}
                        <div className="lg:w-1/2 relative">
                            <div className="rounded-xl shadow-xl border border-slate-200 bg-slate-50 overflow-hidden relative z-10">
                                <img
                                    src={FeaturePlanImage}
                                    alt="生活習慣病療養計画書作成画面"
                                    className="w-full h-auto"
                                />
                            </div>
                            {/* Schedule Image Overlay */}
                            <div className="absolute -bottom-12 -right-4 w-3/4 rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden z-20 transform rotate-2 hover:rotate-0 transition-transform duration-500 hidden md:block">
                                <img
                                    src={FeatureScheduleImage}
                                    alt="年間検査計画表"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Video Section */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-900 opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">実際の動作をご覧ください</h2>
                    <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
                        複雑な操作は一切不要。直感的なインターフェースで、誰でもすぐに使いこなせます。
                    </p>

                    <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-slate-700 bg-slate-800 relative aspect-video group px-0">
                        <video
                            src={DemoVideo}
                            controls
                            className="w-full h-full object-contain bg-black"
                            poster={HeroCompositeImage} // Show the hero image as poster before play
                        >
                            お使いのブラウザは動画タグに対応していません。
                        </video>
                    </div>
                </div>
            </section>

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
