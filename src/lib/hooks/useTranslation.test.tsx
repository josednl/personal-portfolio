import { render, screen } from '@testing-library/react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { AppSettingsProvider } from '@/lib/context/AppSettingsContext';

// Create a test component that uses the hook
const TranslationTestComponent = () => {
  const { t, language } = useTranslation();
  return (
    <div>
      <div data-testid="translation">{t('portfolioOwner')}</div>
      <div data-testid="language">{language}</div>
    </div>
  );
};

describe('useTranslation hook', () => {
  test('returns an object with t and language properties', () => {
    render(
      <AppSettingsProvider>
        <TranslationTestComponent />
      </AppSettingsProvider>,
    );

    // Check that we get the translation function result for a known key
    expect(screen.getByTestId('translation')).toHaveTextContent('José');
    // Check that we get the language (default is English)
    expect(screen.getByTestId('language')).toHaveTextContent('en');
  });
});
