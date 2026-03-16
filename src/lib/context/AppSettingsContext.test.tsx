import { render, screen } from '@testing-library/react';
import { useAppSettings } from '@/lib/context/AppSettingsContext';
import { AppSettingsProvider } from '@/lib/context/AppSettingsContext';
import { act } from 'react-dom/test-utils';

// Helper component to use the hook and expose values for testing
const SettingsTester = () => {
  const settings = useAppSettings();
  return (
    <div>
      <div data-testid="theme-value">{settings.theme}</div>
      <div data-testid="language-value">{settings.language}</div>
      <div data-testid="font-size-value">{settings.fontSize}</div>
    </div>
  );
};

describe('AppSettingsContext', () => {
  test('provides default settings values', () => {
    render(
      <AppSettingsProvider>
        <SettingsTester />
      </AppSettingsProvider>,
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(screen.getByTestId('language-value')).toHaveTextContent('en');
    expect(screen.getByTestId('font-size-value')).toHaveTextContent('16');
  });

  test('toggleTheme changes theme from light to dark', () => {
    // For this test, we need to access the toggle function
    const TestComponentWithToggle = () => {
      const { theme, toggleTheme } = useAppSettings();
      return (
        <div>
          <div data-testid="theme-value">{theme}</div>
          <button data-testid="toggle-button" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <AppSettingsProvider>
        <TestComponentWithToggle />
      </AppSettingsProvider>,
    );

    // Start with light theme
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    // Click toggle button - wrap in act for state updates
    const toggleButton = screen.getByTestId('toggle-button');
    act(() => {
      toggleButton.click();
    });

    // Should now be dark theme
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
  });
});
