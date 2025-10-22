/**
 * ANIMATION SYSTEM - PRACTICAL EXAMPLES
 *
 * Copy-paste ready examples for common animation use cases
 * All animations are hardware-accelerated and accessibility-ready
 */

// ============================================
// 1. BUTTON ANIMATIONS
// ============================================

// Primary Button with Modern Scale
export function PrimaryButton() {
  return (
    <button className="animate-modern-scale bg-primary text-white px-6 py-3 rounded-lg font-semibold">
      Submit Form
    </button>
  );
}

// Secondary Button with Lift Effect
export function SecondaryButton() {
  return (
    <button className="transition-transform-smooth hover-lift-sm border-2 border-primary text-primary px-6 py-3 rounded-lg">
      Learn More
    </button>
  );
}

// Icon Button with Scale
export function IconButton() {
  return (
    <button className="transition-transform-smooth hover-scale-md p-3 rounded-full bg-gray-100">
      <svg className="w-6 h-6" /* ... */ />
    </button>
  );
}

// ============================================
// 2. ENTRANCE ANIMATIONS
// ============================================

// Page Header with Slide Up
export function PageHeader() {
  return (
    <div className="animate-slide-up">
      <h1 className="text-6xl font-bold mb-4">Welcome to The Care Ranch</h1>
      <p className="text-xl text-gray-600">Leadership Retreat Intake</p>
    </div>
  );
}

// Staggered List Items
export function StaggeredList({ items }: { items: string[] }) {
  const delays = [
    '',
    'animate-slide-up-delay-100',
    'animate-slide-up-delay-200',
    'animate-slide-up-delay-300',
  ];

  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className={`${delays[index % 4]} bg-white p-6 rounded-lg shadow-soft`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// Card Grid with Staggered Entrance
export function CardGrid({ cards }: { cards: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`
            ${index === 0 ? 'animate-slide-up' : ''}
            ${index === 1 ? 'animate-slide-up-delay-100' : ''}
            ${index === 2 ? 'animate-slide-up-delay-200' : ''}
            bg-white p-6 rounded-lg shadow-medium
            transition-all-smooth hover-lift-sm
          `}
        >
          <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 3. LOADING STATES
// ============================================

// Loading Spinner
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-pulse-loading">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    </div>
  );
}

// Skeleton Loader
export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="animate-pulse-loading h-8 bg-gray-200 rounded w-3/4" />
      <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-full" />
      <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-5/6" />
      <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-4/5" />
    </div>
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-soft">
      <div className="animate-pulse-loading h-6 bg-gray-200 rounded w-2/3 mb-4" />
      <div className="space-y-2">
        <div className="animate-pulse-loading h-4 bg-gray-200 rounded" />
        <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-5/6" />
        <div className="animate-pulse-loading h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

// Loading Text
export function LoadingText() {
  return <div className="animate-pulse-loading text-gray-500 italic">Loading your data...</div>;
}

// ============================================
// 4. FEEDBACK ANIMATIONS
// ============================================

// Success Toast
export function SuccessToast({ message }: { message: string }) {
  return (
    <div className="animate-success-pop fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}

// Success Checkmark
export function SuccessCheckmark() {
  return (
    <div className="animate-success-pop inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

// Inline Success Message
export function InlineSuccess({ message }: { message: string }) {
  return (
    <div className="animate-success-pop flex items-center gap-2 text-green-600 text-sm">
      <span className="text-xl">✓</span>
      <span>{message}</span>
    </div>
  );
}

// Error Pop (reuses bounce animation)
export function ErrorPop({ message }: { message: string }) {
  return (
    <div className="animate-success-pop bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚠</span>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
}

// ============================================
// 5. PAGE TRANSITIONS
// ============================================

// Simple Page Fade
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}

// Modal Fade In
export function Modal({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="animate-fade-in fixed inset-0 bg-black/50" />
      <div className="animate-success-pop fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">{children}</div>
      </div>
    </div>
  );
}

// Smooth Content Swap
export function ContentSwapper({ show, content1, content2 }: any) {
  return <div className="transition-page">{show ? content1 : content2}</div>;
}

// ============================================
// 6. MICRO-INTERACTIONS
// ============================================

// Toggle Switch
export function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-micro ease-modern
        ${enabled ? 'bg-primary' : 'bg-gray-300'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-micro ease-modern
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}

// Checkbox with Pop Animation
export function AnimatedCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`
        w-6 h-6 rounded border-2 flex items-center justify-center
        transition-colors duration-button ease-modern
        ${checked ? 'bg-primary border-primary' : 'border-gray-300'}
      `}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-white animate-success-pop"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}

// Expandable Section
export function ExpandableSection({ title, children, isOpen, toggle }: any) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <button
        onClick={toggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-micro ease-modern ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="animate-slide-up px-6 py-4">{children}</div>}
    </div>
  );
}

// ============================================
// 7. COMBINED PATTERNS
// ============================================

// Interactive Card
export function InteractiveCard({ title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left
        bg-white p-6 rounded-lg shadow-soft
        transition-all-smooth hover-lift-sm
        hover:shadow-lg
        group
      "
    >
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </button>
  );
}

// Form with Animated Feedback
export function FormWithFeedback() {
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('saving');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus('success');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        className="w-full px-4 py-3 border rounded-lg mb-4"
        placeholder="Enter your name"
      />

      <button
        type="submit"
        disabled={status === 'saving'}
        className="animate-modern-scale bg-primary text-white px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {status === 'saving' ? <span className="animate-pulse-loading">Saving...</span> : 'Submit'}
      </button>

      {status === 'success' && (
        <div className="animate-success-pop mt-4 text-green-600">✓ Saved successfully!</div>
      )}
    </form>
  );
}

// Navigation with Active State
export function Navigation({ items, activeIndex }: { items: string[]; activeIndex: number }) {
  return (
    <nav className="flex gap-6">
      {items.map((item, index) => (
        <a
          key={index}
          href={`#${item.toLowerCase()}`}
          className={`
            relative py-2
            transition-colors duration-button ease-modern
            ${index === activeIndex ? 'text-primary font-semibold' : 'text-gray-600 hover:text-gray-900'}
          `}
        >
          {item}
          {index === activeIndex && (
            <span className="animate-slide-up absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </a>
      ))}
    </nav>
  );
}

// Auto-save Indicator
export function AutoSaveIndicator({ status }: { status: 'idle' | 'saving' | 'saved' | 'error' }) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return (
          <span className="animate-pulse-loading text-gray-500 italic text-sm">Saving...</span>
        );
      case 'saved':
        return <span className="animate-success-pop text-green-600 italic text-sm">✓ Saved</span>;
      case 'error':
        return (
          <span className="animate-success-pop text-red-600 italic text-sm">⚠ Error saving</span>
        );
      default:
        return null;
    }
  };

  return <div className="h-6">{getStatusDisplay()}</div>;
}

// ============================================
// 8. ACCESSIBILITY EXAMPLE
// ============================================

// Button with Reduced Motion Support
export function AccessibleButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="
      animate-modern-scale
      bg-primary text-white px-6 py-3 rounded-lg

      /* Animations automatically respect prefers-reduced-motion */
      /* No additional code needed! */
    "
    >
      {children}
    </button>
  );
}

/**
 * USAGE NOTES:
 *
 * 1. All animations automatically respect prefers-reduced-motion
 * 2. All animations use hardware-accelerated properties (transform, opacity)
 * 3. Combine animations freely: animate-slide-up + transition-all-smooth + hover-lift-sm
 * 4. Use semantic class names for better maintainability
 * 5. Test on mobile devices for performance
 *
 * See ANIMATION_SYSTEM.md for complete documentation
 * See ANIMATION_QUICK_REFERENCE.md for a quick cheat sheet
 */
