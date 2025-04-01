
// Translations for the application UI
// Note: We don't translate trick names as per requirements

export const translations = {
  en: {
    // Tricktionary page
    tricktionary: {
      title: "Tricktionary",
      subtitle: "Explore our database of tricking moves, from basic to advanced techniques.",
      searchPlaceholder: "Search tricks...",
      filterButton: "Filter",
      categoriesHeading: "Categories",
      clearFilters: "Clear Filters",
      applyFilters: "Apply Filters",
      clearAll: "Clear All",
      noTricksFound: "No tricks found",
      tryAdjusting: "Try adjusting your filters or search query.",
      loading: "Loading difficulty levels...",
      // Trick detail dialog
      prerequisites: "Prerequisites",
      updateProgress: "Update Your Progress",
      progressStatus: {
        notStarted: "Not Started",
        started: "Learning",
        completed: "Completed",
        proficient: "Mastered"
      },
      logInPrompt: "Log in to track your progress",
      logIn: "Log In",
      demoAnimation: "Demo animation"
    }
  },
  zh: {
    // Tricktionary page
    tricktionary: {
      title: "招式字典",
      subtitle: "探索我們的特技動作數據庫，從基礎到高級技巧。",
      searchPlaceholder: "搜索招式...",
      filterButton: "篩選",
      categoriesHeading: "類別",
      clearFilters: "清除篩選",
      applyFilters: "應用篩選",
      clearAll: "清除全部",
      noTricksFound: "未找到招式",
      tryAdjusting: "嘗試調整您的篩選條件或搜索查詢。",
      loading: "正在加載難度級別...",
      // Trick detail dialog
      prerequisites: "先決條件",
      updateProgress: "更新您的進度",
      progressStatus: {
        notStarted: "未開始",
        started: "學習中",
        completed: "已完成",
        proficient: "精通"
      },
      logInPrompt: "登錄以追踪您的進度",
      logIn: "登錄",
      demoAnimation: "演示動畫"
    }
  }
};

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof translations.en;
