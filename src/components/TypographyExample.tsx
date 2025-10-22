/**
 * Typography System Example Component
 *
 * This component demonstrates the Playfair Display + Source Sans 3 typography system.
 * Use this as a reference for implementing typography throughout the application.
 */

import React from 'react';

export default function TypographyExample() {
  return (
    <div className="editorial-container py-12">
      <div className="space-y-12">
        {/* Display & Headings Section */}
        <section>
          <h2 className="text-2xl font-sans font-semibold-custom mb-6 text-editorial-gray">
            Headings - Playfair Display
          </h2>

          <div className="space-y-4">
            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-display (60px / 3.75rem)
              </span>
              <h1 className="heading-display">Display Heading</h1>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-1 (48px / 3rem)
              </span>
              <h1 className="heading-1">Heading Level 1</h1>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-2 (36px / 2.25rem)
              </span>
              <h2 className="heading-2">Heading Level 2</h2>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-3 (30px / 1.875rem)
              </span>
              <h3 className="heading-3">Heading Level 3</h3>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-4 (24px / 1.5rem)
              </span>
              <h4 className="heading-4">Heading Level 4</h4>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-5 (20px / 1.25rem)
              </span>
              <h5 className="heading-5">Heading Level 5</h5>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-1 block">
                heading-6 (18px / 1.125rem)
              </span>
              <h6 className="heading-6">Heading Level 6</h6>
            </div>
          </div>
        </section>

        {/* Body Text Section */}
        <section>
          <h2 className="text-2xl font-sans font-semibold-custom mb-6 text-editorial-gray">
            Body Text - Source Sans 3
          </h2>

          <div className="space-y-6">
            <div>
              <span className="caption text-editorial-gray mb-2 block">
                body-large (18px / 1.125rem)
              </span>
              <p className="body-large">
                Large body text is perfect for lead paragraphs and important content. It provides
                excellent readability while maintaining visual hierarchy. Source Sans 3 ensures
                clarity at this size.
              </p>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">
                body-base (16px / 1rem) - Default
              </span>
              <p className="body-base">
                This is the default body text size, optimized for comfortable reading in longer-form
                content. The line height is set to 1.5 for excellent legibility. This size should be
                used for most paragraph content throughout the application.
              </p>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">
                body-small (14px / 0.875rem)
              </span>
              <p className="body-small">
                Small body text is useful for secondary information, helper text, or content that
                needs to be de-emphasized. It maintains readability while taking up less space.
              </p>
            </div>
          </div>
        </section>

        {/* Labels & UI Text Section */}
        <section>
          <h2 className="text-2xl font-sans font-semibold-custom mb-6 text-editorial-gray">
            Labels & UI Text - Source Sans 3
          </h2>

          <div className="space-y-4">
            <div>
              <span className="caption text-editorial-gray mb-2 block">
                label-large (16px / 1rem, semibold)
              </span>
              <label className="label-large block">Large Form Label</label>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">
                label-base (14px / 0.875rem, semibold)
              </span>
              <label className="label-base block">Standard Form Label</label>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">
                label-small (12px / 0.75rem, semibold)
              </span>
              <label className="label-small block">SMALL LABEL</label>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">
                caption (12px / 0.75rem, regular)
              </span>
              <span className="caption block">
                Caption text for additional information or helper text
              </span>
            </div>
          </div>
        </section>

        {/* Font Weights Section */}
        <section>
          <h2 className="text-2xl font-sans font-semibold-custom mb-6 text-editorial-gray">
            Font Weights
          </h2>

          <div className="space-y-3">
            <p className="text-lg">
              <span className="font-normal-custom">Normal (400) - Source Sans 3 Regular</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold-custom">Semibold (600) - Source Sans 3 Semibold</span>
            </p>
            <p className="text-lg font-serif">
              <span className="font-bold-custom">Bold (700) - Playfair Display Bold</span>
            </p>
          </div>
        </section>

        {/* Special Styles Section */}
        <section>
          <h2 className="text-2xl font-sans font-semibold-custom mb-6 text-editorial-gray">
            Special Styles
          </h2>

          <div className="space-y-4">
            <div>
              <span className="caption text-editorial-gray mb-2 block">text-uppercase-spaced</span>
              <span className="text-uppercase-spaced text-sm">
                Uppercase with wide letter spacing
              </span>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">text-editorial-serif</span>
              <span className="text-editorial-serif text-lg">
                Editorial serif style with bold weight
              </span>
            </div>

            <div>
              <span className="caption text-editorial-gray mb-2 block">text-editorial-sans</span>
              <span className="text-editorial-sans text-lg">
                Editorial sans style with normal weight
              </span>
            </div>
          </div>
        </section>

        {/* Content Example Section */}
        <section className="pt-8 border-t border-editorial-lightGray">
          <h2 className="heading-2 mb-6">Real-World Example</h2>

          <article className="space-y-4">
            <p className="body-large">
              This is a lead paragraph using the body-large class. It introduces the content and
              draws the reader in with slightly larger text that stands out from the rest of the
              body copy.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Section Heading</h3>

            <p className="body-base">
              Regular body text follows, providing detailed information in an easy-to-read format.
              The Source Sans 3 typeface ensures excellent legibility across all screen sizes and
              devices.
            </p>

            <p className="body-base">
              Multiple paragraphs maintain consistent spacing and rhythm, creating a pleasant
              reading experience. The line height is optimized for comfortable scanning and
              comprehension.
            </p>

            <h4 className="heading-4 mt-6 mb-3">Subsection Heading</h4>

            <p className="body-base">
              Smaller headings help break up content into digestible sections. The Playfair Display
              font adds elegance and sophistication while maintaining clear hierarchy.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>List items use the same body text styling</li>
              <li>Consistent line height maintains rhythm</li>
              <li>Proper spacing between items aids readability</li>
            </ul>

            <span className="caption text-editorial-gray block mt-6">
              This is caption text, perfect for image credits, footnotes, or supplementary
              information.
            </span>
          </article>
        </section>

        {/* Typography Guidelines */}
        <section className="pt-8 border-t border-editorial-lightGray">
          <h2 className="heading-3 mb-4">Usage Guidelines</h2>

          <div className="editorial-card space-y-4">
            <div>
              <h5 className="heading-5 mb-2">When to use Playfair Display</h5>
              <p className="body-small text-editorial-gray">
                Use for all headings (h1-h6) to create visual hierarchy and add elegance. The bold
                weight (700) ensures proper emphasis.
              </p>
            </div>

            <div>
              <h5 className="heading-5 mb-2">When to use Source Sans 3</h5>
              <p className="body-small text-editorial-gray">
                Use for all body text, labels, and UI elements. The regular weight (400) is for body
                text, while semibold (600) provides emphasis.
              </p>
            </div>

            <div>
              <h5 className="heading-5 mb-2">Responsive Behavior</h5>
              <p className="body-small text-editorial-gray">
                Headings automatically scale down on mobile devices to maintain readability. Test at
                different viewport sizes to ensure proper display.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
