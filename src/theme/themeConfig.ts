import type { ThemeConfig } from 'antd';
import { theme as antTheme } from 'antd';

// Shared tokens for both themes
const sharedTokens = {
  // Primary colors - Neon Pink
  colorPrimary: '#ff2d78',
  colorPrimaryHover: '#ff5a9d',
  colorPrimaryActive: '#d9005a',
  
  // Success/Error/Warning
  colorSuccess: '#00ff88',
  colorError: '#ff4d6a',
  colorWarning: '#ffaa00',
  colorInfo: '#00d4ff',
  
  // Border radius - Sharp corners for esports look
  borderRadius: 4,
  borderRadiusLG: 8,
  borderRadiusSM: 2,
  
  // Font
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 14,
  
  // Control heights
  controlHeight: 44,
  controlHeightLG: 52,
  controlHeightSM: 36,
};

// Dark theme configuration
export const darkTheme: ThemeConfig = {
  algorithm: antTheme.darkAlgorithm,
  token: {
    ...sharedTokens,
    colorPrimaryBg: 'rgba(255, 45, 120, 0.1)',
    colorPrimaryBgHover: 'rgba(255, 45, 120, 0.2)',
    
    // Background colors - Deep black/dark purple
    colorBgBase: '#0a0a0f',
    colorBgContainer: '#12121a',
    colorBgElevated: '#1a1a2e',
    colorBgLayout: '#0a0a0f',
    colorBgSpotlight: '#1a1a2e',
    
    // Text colors
    colorText: '#ffffff',
    colorTextSecondary: '#a0a0b0',
    colorTextTertiary: '#6b6b7b',
    colorTextQuaternary: '#4a4a5a',
    
    // Border colors
    colorBorder: '#2a2a3e',
    colorBorderSecondary: '#1f1f2e',
    
    // Box shadow with neon glow
    boxShadow: '0 4px 20px rgba(255, 45, 120, 0.15)',
    boxShadowSecondary: '0 2px 10px rgba(0, 0, 0, 0.3)',
  },
  components: {
    Button: {
      primaryShadow: '0 0 20px rgba(255, 45, 120, 0.5)',
      defaultBg: '#1a1a2e',
      defaultColor: '#ffffff',
      defaultBorderColor: '#2a2a3e',
      fontWeight: 600,
    },
    Card: {
      colorBgContainer: '#12121a',
      colorBorderSecondary: '#2a2a3e',
    },
    Input: {
      colorBgContainer: '#0a0a0f',
      colorBorder: '#2a2a3e',
      activeBorderColor: '#ff2d78',
      hoverBorderColor: '#ff5a9d',
    },
    Select: {
      colorBgContainer: '#0a0a0f',
      colorBorder: '#2a2a3e',
      optionSelectedBg: 'rgba(255, 45, 120, 0.2)',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: 'rgba(255, 45, 120, 0.2)',
      darkItemHoverBg: 'rgba(255, 45, 120, 0.1)',
    },
    Steps: {
      colorPrimary: '#ff2d78',
    },
    Radio: {
      colorPrimary: '#ff2d78',
      buttonSolidCheckedBg: '#ff2d78',
    },
    Progress: {
      colorSuccess: '#00ff88',
    },
    Result: {
      colorSuccess: '#00ff88',
      colorError: '#ff4d6a',
      colorWarning: '#ffaa00',
    },
  },
};

// Light theme configuration
export const lightTheme: ThemeConfig = {
  algorithm: antTheme.defaultAlgorithm,
  token: {
    ...sharedTokens,
    // Primary color - slightly adjusted for light theme
    colorPrimary: '#e91e63',
    colorPrimaryHover: '#f06292',
    colorPrimaryActive: '#c2185b',
    colorPrimaryBg: 'rgba(233, 30, 99, 0.08)',
    colorPrimaryBgHover: 'rgba(233, 30, 99, 0.12)',
    
    // Background colors - Clean and bright
    colorBgBase: '#f8f8fa',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f8f8fa',
    colorBgSpotlight: '#fff0f5',
    
    // Text colors - High contrast
    colorText: '#1a1a2e',
    colorTextSecondary: '#4a4a5a',
    colorTextTertiary: '#7a7a8a',
    colorTextQuaternary: '#a0a0a8',
    
    // Border colors
    colorBorder: '#e0e0e8',
    colorBorderSecondary: '#ebebf0',
    
    // Box shadow - Subtle and clean
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    boxShadowSecondary: '0 1px 4px rgba(0, 0, 0, 0.06)',
  },
  components: {
    Button: {
      primaryShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
      defaultBg: '#ffffff',
      defaultColor: '#1a1a2e',
      defaultBorderColor: '#e0e0e8',
      fontWeight: 600,
    },
    Card: {
      colorBgContainer: '#ffffff',
      colorBorderSecondary: '#e0e0e8',
    },
    Input: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e0e0e8',
      activeBorderColor: '#e91e63',
      hoverBorderColor: '#f06292',
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorBorder: '#e0e0e8',
      optionSelectedBg: 'rgba(233, 30, 99, 0.08)',
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'rgba(233, 30, 99, 0.08)',
      itemHoverBg: 'rgba(233, 30, 99, 0.04)',
      itemColor: '#4a4a5a',
      itemSelectedColor: '#e91e63',
    },
    Steps: {
      colorPrimary: '#e91e63',
    },
    Radio: {
      colorPrimary: '#e91e63',
      buttonSolidCheckedBg: '#e91e63',
    },
    Progress: {
      colorSuccess: '#00c96a',
    },
    Result: {
      colorSuccess: '#00c96a',
      colorError: '#f44336',
      colorWarning: '#ff9800',
    },
    Table: {
      headerBg: '#f5f5f8',
      headerColor: '#4a4a5a',
      rowHoverBg: 'rgba(233, 30, 99, 0.04)',
    },
    Collapse: {
      headerBg: '#ffffff',
      contentBg: '#ffffff',
    },
  },
};

// Default export for backward compatibility
export default darkTheme;
