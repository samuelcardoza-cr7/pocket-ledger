import { useState } from 'react';
import { SignIn, SignUp } from '@clerk/react';
import { ArrowRight, ChartNoAxesCombined, Moon, ShieldCheck, Sun } from 'lucide-react';

const clerkAppearance = {
  variables: { colorPrimary: '#595bcf', colorText: '#292b48', colorTextSecondary: '#777d92', borderRadius: '0.7rem', fontFamily: 'DM Sans, sans-serif' },
  elements: { cardBox: 'clerk-auth-card-box', card: 'clerk-auth-card', headerTitle: 'clerk-auth-title', headerSubtitle: 'clerk-auth-subtitle', formFieldLabel: 'clerk-auth-label', formFieldInput: 'clerk-auth-input', formButtonPrimary: 'clerk-auth-primary', footer: 'clerk-auth-footer', socialButtonsBlockButton: 'clerk-social-button' },
};

export default function AuthScreen({ clerkEnabled, onDemo, theme = 'light', onToggleTheme }) {
  const [mode, setMode] = useState('login');
  return (
    <main className="auth-page">
      <section className="auth-aside">
        <a className="brand" href="#"><span className="brand-mark">p</span> pocket<span className="brand-light">ledger</span></a>
        <div className="auth-story">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR MONEY, IN FOCUS</div>
          <h1>Feel good about<br />where it goes.</h1>
          <p>A calmer way to keep track of spending, make room for what matters, and build a little more confidence with every month.</p>
          <div className="story-points"><span><ChartNoAxesCombined size={17} /> See the full picture</span><span><ShieldCheck size={17} /> Your finances stay yours</span></div>
          <div className="auth-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-cards"><div className="art-card art-card-back"/><div className="art-card art-card-front"><div className="art-card-top"><span>AVAILABLE BALANCE</span><span className="art-dot"/></div><strong>₹48,286<span>.50</span></strong><div className="art-lines"><i/><i/><i/></div></div></div><div className="art-spark">✳</div><div className="art-star">✦</div></div>
        </div>
      </section>
      <section className="auth-main">
        <button className="icon-btn theme-toggle auth-theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
        <div className="auth-mobile-brand"><a className="brand" href="#"><span className="brand-mark">p</span> pocket<span className="brand-light">ledger</span></a></div>
        <div className="auth-card">
          <div className="auth-kicker">A FRESH START, EVERY MONTH</div>
          <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
          <p className="auth-subtitle">{mode === 'login' ? 'Pick up right where you left off.' : 'A better view of your finances starts here.'}</p>
          {clerkEnabled ? <>
            <div className="auth-mode-switch"><button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button><button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Create account</button></div>
            <div className="clerk-auth-wrap">{mode === 'login' ? <SignIn routing="hash" appearance={clerkAppearance}/> : <SignUp routing="hash" appearance={clerkAppearance}/>}</div>
          </> : <div className="clerk-setup-note"><strong>Clerk sign-in needs your app keys.</strong><p>Add the Clerk publishable key to <code>client/.env</code>. Add your Clerk secret key to <code>server/.env</code> to enable secure API requests.</p></div>}
          <div className="auth-divider"><span>OR EXPLORE FIRST</span></div>
          <button className="demo-btn" onClick={onDemo}>Open the sample dashboard <ArrowRight size={16}/></button>
          <p className="auth-footnote">Sample data stays in this browser. Your account uses Clerk-secured API access.</p>
        </div>
        <p className="auth-legal">Built for clarity. Your financial data is personal.</p>
      </section>
    </main>
  );
}
