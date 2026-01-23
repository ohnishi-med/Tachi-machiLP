import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// FeaturePlanImage unused, removed for cleanup
import GuideReferralStep1 from '../assets/guide-referral-step1.png';
import GuideReferralStep2 from '../assets/guide-referral-step2.png';
import GuideReferralStep3 from '../assets/guide-referral-step3.png';
import GuidePlanStep1 from '../assets/guide-plan-step1.png';
import GuidePlanStep2 from '../assets/guide-plan-step2.png';
import GuidePlanStep3 from '../assets/guide-plan-step3.png';
import GuideReplyStep from '../assets/guide-reply-step.png';
import GuideCertificateImage from '../assets/guide-certificate.png';
import GuideSettingsStep1 from '../assets/guide-settings-step1.png';
import GuideSettingsStep2 from '../assets/guide-settings-step2.png';
import GuideSettingsStep3 from '../assets/guide-settings-step3.png';
import GuideStartupLogin from '../assets/guide-startup-login.png';
import GuideStartupMenu from '../assets/guide-startup-menu.png';

// ... (HandIcon, FocusImage, SlideshowFocusImage definitions) ...


// 指アイコンコンポーネント
const HandIcon: React.FC = () => (
    <svg
        className="w-12 h-12 text-teal-600 drop-shadow-xl animate-bounce"
        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.3))" }}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M18.87 12.07l-6.73 6.73c-0.34 0.34-0.89 0.34-1.23 0l-1.63-1.63c-0.34-0.34-0.34-0.89 0-1.23l2.87-2.87H4c-0.55 0-1-0.45-1-1v-2c0-0.55 0.45-1 1-1h8.17l-2.87-2.87c-0.34-0.34-0.34-0.89 0-1.23l1.63-1.63c0.34-0.34 0.89-0.34 1.23 0l6.73 6.73c0.33 0.33 0.33 0.87-0.03 1.23z" transform="rotate(90 12 12)" />
        {/* 指差す形に変更 (Heroicons "hand-thumb-up" などの代わりにシンプルな矢印/指) */}
        <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

const FocusImage: React.FC<{
    src: string;
    alt: string;
    zoom?: number;
    focusX?: number;
    focusY?: number;
    label?: string;
}> = ({ src, alt, zoom = 1.5, focusX = 50, focusY = 50, label }) => {
    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md border border-slate-200 mb-8 aspect-video group bg-slate-100">
            {/* Image Layer */}
            <div
                className="w-full h-full transition-transform duration-500 ease-in-out"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: `${focusX}% ${focusY}%`
                }}
            >
                <img src={src} alt={alt} className="w-full h-full object-cover" />
            </div>

            {/* Overlay Layer (Visual Indicator) */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: `${focusX}%`,
                    top: `${focusY}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {/* Ping Animation for attention */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping duration-1000"></span>

                <div className="relative flex flex-col items-center">
                    <div className="text-4xl filter drop-shadow-lg"><HandIcon /></div>
                    {/* Label Badge */}
                    {label && (
                        <div className="mt-2 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap backdrop-blur-sm border border-slate-700">
                            {label}
                        </div>
                    )}
                </div>
            </div>

            {/* "Click to view full" hint (Optional, mainly visual here) */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-[10px] px-2 py-1 rounded">
                拡大表示中
            </div>
        </div>
    );
};

// スライドショー機能付き詳細画像コンポーネント
interface SlideData {
    src: string;
    focusX?: number;
    focusY?: number;
    label?: string;
    text?: string;
}

const SlideshowFocusImage: React.FC<{
    images?: string[]; // Legacy support
    slides?: SlideData[]; // New support
    alt: string;
    zoom?: number;
    focusX?: number; // Global default
    focusY?: number; // Global default
    label?: string;  // Global default
    interval?: number;
}> = ({ images, slides, alt, zoom = 1.0, focusX = 50, focusY = 50, label, interval = 3000 }) => {
    // Normalize data to slides format
    const slideItems: SlideData[] = slides || (images ? images.map(src => ({ src })) : []);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (slideItems.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slideItems.length);
        }, interval);
        return () => clearInterval(timer);
    }, [slideItems.length, interval]);

    const currentSlide = slideItems[currentIndex];
    // Use slide-specific data or fallback to global defaults
    const currentFocusX = currentSlide.focusX ?? focusX;
    const currentFocusY = currentSlide.focusY ?? focusY;
    const currentLabel = currentSlide.label ?? label ?? currentSlide.text;

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md border border-slate-200 mb-8 aspect-video group bg-slate-100">
            {/* Image Layer */}
            <div
                className="w-full h-full transition-transform duration-500 ease-in-out relative"
                style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: `${currentFocusX}% ${currentFocusY}%`
                }}
            >
                {slideItems.map((slide, index) => (
                    <img
                        key={slide.src}
                        src={slide.src}
                        alt={`${alt} ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* Overlay Layer (Visual Indicator) */}
            <div
                className="absolute pointer-events-none transition-all duration-500 ease-in-out"
                style={{
                    left: `${currentFocusX}%`,
                    top: `${currentFocusY}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {/* Ping Animation for attention */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping duration-1000"></span>

                <div className="relative flex flex-col items-center">
                    <div className="text-4xl filter drop-shadow-lg"><HandIcon /></div>
                    {/* Label Badge */}
                    {currentLabel && (
                        <div className="mt-2 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap backdrop-blur-sm border border-slate-700">
                            {currentLabel}
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slideItems.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-teal-500 w-4' : 'bg-slate-300'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Guide: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeSection, setActiveSection] = useState<string>('intro');

    const sections = [
        { id: 'intro', label: 'はじめに' },
        { id: 'basic', label: '基本操作' },
        { id: 'referral', label: '紹介状の作成' },
        { id: 'certificate', label: '診断書の作成' },
        { id: 'reply', label: '返書（返信）の作成' },
        { id: 'plan', label: '療養計画書の作成' },
        { id: 'settings', label: '設定・カスタマイズ' },
        { id: 'faq', label: 'よくある質問' },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-slate-800 flex items-center mr-8">
                            <span className="bg-teal-600 text-white p-1 rounded mr-2">T</span>
                            タチマチ
                        </Link>
                        <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            操作ガイド
                        </span>
                    </div>
                    <Link to="/" className="text-sm font-bold text-teal-600 hover:text-teal-700">
                        トップへ戻る →
                    </Link>
                </div>
            </nav>

            <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 flex gap-8">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <div className="fixed top-24 w-64">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">目次</h3>
                            <ul className="space-y-1">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors font-medium border-l-2 ${activeSection === section.id
                                                ? 'bg-teal-50 text-teal-700 border-teal-500'
                                                : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700 border-transparent'
                                                }`}
                                        >
                                            {section.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-3xl mx-auto">

                        {/* Introduction */}
                        <section id="intro" className="mb-20 scroll-mt-24">
                            <h1 className="text-3xl font-bold text-slate-900 mb-6">
                                タチマチ 操作マニュアル
                            </h1>
                            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 mb-8">
                                <p className="text-lg leading-relaxed text-slate-700 mb-4">
                                    タチマチは、電子カルテ（m3 Digikarなど）と連携し、紹介状や療養計画書などの医療文書を効率的に作成・管理できるChrome拡張機能です。
                                </p>
                                <p className="text-slate-600">
                                    このガイドでは、基本的な使い方から便利な機能まで、ステップバイステップで解説します。
                                </p>
                            </div>
                        </section>

                        {/* Basic Operations */}
                        <section id="basic" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                基本操作と画面構成
                            </h2>
                            <div className="space-y-12">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">1</span>
                                        画面の起動と見方
                                    </h3>
                                    <p className="text-slate-600 mb-4">
                                        カルテを開いた状態で、ブラウザ右上の <span className="font-bold text-slate-800 bg-slate-100 px-1 rounded">T</span> アイコンをクリックして起動します。
                                        画面は作業効率を最大化するため、左右2分割されています。
                                    </p>

                                    <div className="mb-6">
                                        <SlideshowFocusImage
                                            images={[GuideStartupLogin, GuideStartupMenu]}
                                            alt="起動とログインの流れ"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={60}
                                            label="ログインしてメニューを選択"
                                            interval={4000}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg">
                                            <h4 className="font-bold text-teal-800 mb-2">左側：入力エリア</h4>
                                            <p className="text-teal-700">文字を入力したり、項目を選択する作業スペースです。自動入力された情報の修正もここで行います。</p>
                                        </div>
                                        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
                                            <h4 className="font-bold text-indigo-800 mb-2">右側：プレビューエリア</h4>
                                            <p className="text-indigo-700">作成中の書類がリアルタイムで表示されます。印刷時のイメージを常に確認できます。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Referral Letter */}
                        <section id="referral" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                紹介状（診療情報提供書）の作成
                            </h2>

                            <div className="space-y-12">
                                {/* Step 1-2: Destination */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">STEP 1-2</span>
                                        紹介先（宛先）を指定する
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        紹介先の医療機関を入力します。検索機能を使うと、住所や電話番号が自動入力されて便利です。
                                    </p>

                                    <SlideshowFocusImage
                                        images={[GuideReferralStep1]}
                                        alt="紹介先の検索"
                                        zoom={1.0}
                                        focusX={30}
                                        focusY={40}
                                        label="病院名で検索"
                                        interval={5000}
                                    />

                                    <div className="mt-4 grid gap-3">
                                        <div className="flex items-start bg-slate-50 p-3 rounded">
                                            <span className="font-bold text-blue-600 mr-2 text-sm min-w-16">検索入力</span>
                                            <p className="text-sm text-slate-600">「医療機関名を検索...」欄に入力します。※2026年1月時点の保険医療機関データを参照します。</p>
                                        </div>
                                        <div className="flex items-start bg-slate-50 p-3 rounded">
                                            <span className="font-bold text-green-600 mr-2 text-sm min-w-16">お気に入り</span>
                                            <p className="text-sm text-slate-600">よく使う病院は「お気に入り1～3」ボタンで一発入力できます（設定で登録可能）。</p>
                                        </div>
                                        <div className="flex items-start bg-slate-50 p-3 rounded">
                                            <span className="font-bold text-slate-600 mr-2 text-sm min-w-16">直接入力</span>
                                            <p className="text-sm text-slate-600">検索で見つからない場合は、手動で入力してください。</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3-4: Patient Info & Content */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">STEP 3-4</span>
                                        患者情報と内容の入力
                                    </h3>
                                    <div className="mb-6">
                                        <SlideshowFocusImage
                                            images={[GuideReferralStep2]}
                                            alt="患者情報の確認"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={50}
                                            label="カルテから自動入力されます"
                                            interval={5000}
                                        />
                                    </div>
                                    <p className="text-slate-600 text-sm mb-4">
                                        患者情報はカルテから自動で読み込まれます。紹介目的や既往歴を入力してください。定型文も活用できます。
                                    </p>
                                </div>

                                {/* Step 5: Save */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">STEP 5</span>
                                        PDF保存と発行
                                    </h3>
                                    <div className="mb-6">
                                        <SlideshowFocusImage
                                            images={[GuideReferralStep3]}
                                            alt="PDF保存ボタン"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={90}
                                            label="ここをクリックして保存"
                                            interval={5000}
                                        />
                                    </div>
                                    <p className="text-slate-600 text-sm">
                                        プレビューを確認し、問題なければ「PDF確定・履歴保存」ボタンを押してください。PDFファイルがダウンロードされます。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Medical Certificate */}
                        <section id="certificate" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                診断書の作成
                            </h2>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-full md:w-1/2">
                                        <FocusImage
                                            src={GuideCertificateImage}
                                            alt="診断書作成画面"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={50}
                                            label="シンプルな入力画面"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-slate-800 flex items-center">
                                                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs mr-2">STEP 1</span>
                                                「診断書」タブを開く
                                            </h3>
                                            <p className="text-sm text-slate-600">メニューから診断書を選択します。</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-slate-800 flex items-center">
                                                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs mr-2">STEP 2</span>
                                                診断内容を入力
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                診断名、診断年月日、および詳細な追記（経過や治癒見込みなど）を入力してください。
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-bold text-slate-800 flex items-center">
                                                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs mr-2">STEP 3</span>
                                                発行
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                PDF確定ボタンで保存します。
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Reply Letter (NEW) */}
                        <section id="reply" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                返書（診療情報提供書・返信）の作成
                            </h2>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <div className="space-y-6">
                                    <p className="text-slate-600">紹介元医療機関へのご返事（返信）を作成します。</p>

                                    <div className="mb-6">
                                        <SlideshowFocusImage
                                            images={[GuideReplyStep]}
                                            alt="返書作成画面"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={50}
                                            label="宛先と報告内容を入力"
                                            interval={5000}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <h4 className="font-bold text-slate-800 mb-2 text-sm">宛先の入力</h4>
                                            <p className="text-xs text-slate-600">紹介状と同様に、医療機関検索やお気に入りが使えます。紹介元の情報がわかる場合は検索して入力してください。</p>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <h4 className="font-bold text-slate-800 mb-2 text-sm">報告内容</h4>
                                            <p className="text-xs text-slate-600">「受診報告」「傷病名」「報告内容（検査結果・方針など）」を入力して発行してください。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Treatment Plan */}
                        <section id="plan" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                生活習慣病 療養計画書の作成
                            </h2>

                            <div className="space-y-12">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                        <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">STEP 3</span>
                                        目標設定（かんたん設定機能）
                                    </h3>
                                    <p className="text-slate-600 mb-6">
                                        「厳格・標準・緩和」ボタンを押すと、ガイドラインに基づいた目標値（HbA1c、血圧、LDLなど）が一括で入力されます。
                                    </p>

                                    <div className="mb-6">
                                        <SlideshowFocusImage
                                            images={[GuidePlanStep1, GuidePlanStep2, GuidePlanStep3]}
                                            alt="療養計画書の作成ステップ"
                                            zoom={1.0}
                                            focusX={50}
                                            focusY={30}
                                            label="ボタンで目標値を自動入力"
                                            interval={4000}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4 text-sm">STEP 5: 年間検査計画</h3>
                                        <p className="text-sm text-slate-600 mb-4">
                                            画面下部の「年間検査計画」で、向こう1年間の検査スケジュールを作成できます。「一括入力」を使えば標準セットを瞬時に反映可能です。
                                        </p>
                                    </div>
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4 text-sm">便利機能: JSONコピー</h3>
                                        <p className="text-sm text-slate-600 mb-4">
                                            「JSONコピー」ボタンを押すと入力データをコピーできます。これを電子カルテに貼り付けておけば、次回作成時に「再利用」でデータを復元できます。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Settings */}
                        <section id="settings" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                設定・カスタマイズ
                            </h2>

                            <SlideshowFocusImage
                                images={[GuideSettingsStep1, GuideSettingsStep2, GuideSettingsStep3]}
                                alt="設定画面の操作フロー"
                                zoom={1.0}
                                focusX={50}
                                focusY={50}
                                label="自院情報と医師を登録"
                                interval={3000}
                            />

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-2">自院情報の登録</h3>
                                <p className="text-slate-600 mb-4 text-sm">
                                    ここで登録した情報は、すべての書類の「発行元」欄に自動的に反映されます。
                                </p>
                                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
                                    <h4 className="font-bold text-teal-800 text-sm mb-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 4 0 0112 0v1zm0 0h6v-1a6 4 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                        複数医師の登録が可能
                                    </h4>
                                    <p className="text-teal-700 text-xs">
                                        医師は複数名登録できます。書類作成時に、担当医をプルダウンから簡単に選択して切り替えることができます。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* FAQ (NEW) */}
                        <section id="faq" className="mb-20 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">
                                よくある質問 (FAQ)
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Q. 文字が入りきらずに切れてしまいます</h3>
                                    <p className="text-slate-600 text-sm">
                                        A. プレビューはリアルタイムで反映されます。枠に収まらない場合は、適宜改行を入れるか、文章を要約して短くしてください。入力エリアの拡張も可能です。
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Q. 郵便番号を入れても住所が出ません</h3>
                                    <p className="text-slate-600 text-sm">
                                        A. 住所検索はインターネット通信を使用します。ネットワーク接続をご確認ください。また、一部の事業所個別郵便番号には非対応の場合があります。
                                    </p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-800 mb-2 text-lg">Q. 以前のデータを再利用したい</h3>
                                    <p className="text-slate-600 text-sm">
                                        A. 画面上部の「作成履歴（時計アイコン）」から、過去の作成データを呼び出して再編集・再発行が可能です。
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-400 text-sm">
                        &copy; 2026 Tachi-machi. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Guide;
