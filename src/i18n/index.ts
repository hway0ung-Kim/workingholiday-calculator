import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        close: 'Close',
        day: 'day',
        days: 'days',
        hour: 'hour',
        hours: 'hours',
        week: 'week',
        weeks: 'weeks'
      },
      nav: {
        home: 'Home',
        wageCalculator: 'Wage Calculator',
        visaCalculator: 'Visa Calculator',
        community: 'Community',
        profile: 'My Page',
        calendar: 'Calendar',
        admin: 'Admin'
      },
      home: {
        welcomeBack: 'Welcome back, {{name}}!',
        motivationalQuote: '"Every step forward is a step toward achieving something bigger and better than your current situation."',
        quickActions: 'Quick Actions',
        quickWageCheck: 'Quick Wage Check',
        quickWageCheckDesc: 'Instant wage estimation without signup',
        wageCalculator: 'Wage Calculator',
        wageCalculatorDesc: 'Detailed calculation with job profiles',
        visaExtension: 'Visa Extension',
        visaExtensionDesc: 'Track your 88/179-day requirement',
        features: {
          title: 'Why Choose Working Holiday Mate?',
          accurate: 'Fair Work Australia compliant calculations',
          visa: 'Integrated visa extension tracking',
          community: 'Connect with fellow working holiday makers'
        },
        topEarners: {
          title: 'Top Earners This Month',
          noData: 'No data available yet'
        },
        cta: {
          title: 'Ready to start tracking your earnings?',
          description: 'Join thousands of working holiday makers who trust us with their wage calculations.',
          button: 'Get Started Free'
        }
      },
      auth: {
        signIn: 'Sign In',
        signOut: 'Sign Out',
        signInWithGoogle: 'Continue with Google',
        setupNickname: 'Set up your nickname',
        nicknameLabel: 'Choose a nickname',
        nicknamePlaceholder: 'Enter your nickname',
        nicknameRequired: 'Nickname is required',
        continueButton: 'Continue',
        welcomeTitle: 'Welcome to Working Holiday Mate!',
        setupDescription: 'Please choose a nickname to get started'
      },
      wage: {
        title: 'Wage Calculator',
        calculator: {
          title: 'Wage Calculator',
          description: 'Calculate your wages with Australian Fair Work standards compliance',
          quickCheck: 'Quick Check',
          detailedCalculator: 'Detailed Calculator',
          comparison: {
            title: 'Feature Comparison',
            quick: {
              noAccount: 'No account required',
              basicCalculation: 'Basic wage calculation',
              instant: 'Instant results'
            },
            detailed: {
              profiles: 'Multiple job profiles',
              fairWork: 'Fair Work Australia data',
              tracking: 'Daily work tracking',
              visaIntegration: 'Visa day calculation'
            }
          }
        },
        quickCheck: {
          title: 'Quick Wage Check',
          subtitle: 'Get an instant estimate of your weekly earnings',
          hourlyRate: 'Hourly Rate',
          dailyHours: 'Daily Working Hours',
          daysPerWeek: 'Days per Week',
          calculate: 'Calculate',
          calculating: 'Calculating...',
          result: 'Weekly Wage Estimate',
          weeklyHours: 'Total Hours',
          regularPay: 'Regular Pay',
          overtimePay: 'Overtime Pay',
          grossPay: 'Gross Pay (Before Tax)',
          afterTax: 'After Tax (Estimate)',
          calculate_again: 'Calculate Again',
          fillAllFields: 'Please fill in all fields',
          invalidValues: 'Please enter valid positive numbers',
          disclaimer: 'This is an estimate only. Actual wages may vary based on award conditions, location, and other factors.',
          signUpPrompt: {
            title: 'Want more accurate calculations?',
            description: 'Sign up for detailed wage tracking with Fair Work Australia compliance, penalty rates, and visa day counting.',
            button: 'Sign Up Free'
          },
          feature: {
            title: 'Quick & Simple Wage Estimation',
            description: 'Perfect for getting a rough idea of your potential earnings. No signup required, instant results.',
            noSignup: 'No Signup',
            instant: 'Instant',
            estimate: 'Estimate'
          }
        },
        detailedCalculator: {
          title: 'Detailed Wage Calculator',
          description: 'Comprehensive wage tracking with Fair Work compliance and visa integration',
          comingSoon: 'Coming Soon',
          loginRequired: {
            title: 'Login Required',
            description: 'Sign in to access detailed wage calculations, job profiles, and visa day tracking.'
          }
        },
        detailedRequiresLogin: 'Detailed calculator requires login. Would you like to sign in now?'
      },
      visa: {
        title: 'Visa Extension Calculator',
        description: 'Track your progress toward second/third visa requirements'
      },
      community: {
        title: 'Community',
        description: 'Connect with fellow working holiday makers'
      },
      profile: {
        title: 'My Profile',
        nickname: 'Nickname',
        email: 'Email',
        joinDate: 'Member since',
        settings: 'Settings',
        deleteAccount: 'Delete Account',
        suggestions: 'Send Feedback'
      },
      calendar: {
        title: 'Work Calendar',
        description: 'Track your daily work hours',
        addRecord: 'Add Work Record',
        noRecords: 'No work records yet'
      },
      language: {
        select: 'Select Language',
        detected: 'We detected your browser language as {{language}}. Would you like to switch?',
        switch: 'Switch to {{language}}',
        keepEnglish: 'Keep English',
        english: 'English',
        korean: '한국어',
        japanese: '日本語'
      }
    }
  },
  ko: {
    translation: {
      common: {
        loading: '로딩 중...',
        error: '오류',
        success: '성공',
        cancel: '취소',
        confirm: '확인',
        save: '저장',
        edit: '편집',
        delete: '삭제',
        close: '닫기',
        day: '일',
        days: '일',
        hour: '시간',
        hours: '시간',
        week: '주',
        weeks: '주'
      },
      nav: {
        home: '홈',
        wageCalculator: '급여 계산기',
        visaCalculator: '비자 계산기',
        community: '커뮤니티',
        profile: '마이페이지',
        calendar: '캘린더',
        admin: '관리자'
      },
      home: {
        welcomeBack: '{{name}}님, 다시 오신 것을 환영합니다!',
        motivationalQuote: '"앞으로 나아가는 모든 걸음이 현재보다 더 크고 나은 것을 달성하기 위한 발걸음입니다."',
        quickActions: '빠른 실행',
        quickWageCheck: '빠른 급여 확인',
        quickWageCheckDesc: '가입 없이 즉시 급여 추정',
        wageCalculator: '급여 계산기',
        wageCalculatorDesc: '직업 프로필과 함께 상세 계산',
        visaExtension: '비자 연장',
        visaExtensionDesc: '88/179일 요건 추적',
        features: {
          title: '워홀 메이트를 선택하는 이유?',
          accurate: 'Fair Work Australia 준수 계산',
          visa: '통합된 비자 연장 추적',
          community: '동료 워킹홀리데이 참가자들과 연결'
        },
        topEarners: {
          title: '이번 달 최고 수입자',
          noData: '아직 데이터가 없습니다'
        },
        cta: {
          title: '수입 추적을 시작할 준비가 되셨나요?',
          description: '우리의 급여 계산을 신뢰하는 수천 명의 워킹홀리데이 참가자들과 함께하세요.',
          button: '무료로 시작하기'
        }
      },
      auth: {
        signIn: '로그인',
        signOut: '로그아웃',
        signInWithGoogle: 'Google로 계속하기',
        setupNickname: '닉네임 설정',
        nicknameLabel: '닉네임을 선택하세요',
        nicknamePlaceholder: '닉네임을 입력하세요',
        nicknameRequired: '닉네임이 필요합니다',
        continueButton: '계속',
        welcomeTitle: '워홀 메이트에 오신 것을 환영합니다!',
        setupDescription: '시작하기 위해 닉네임을 선택해주세요'
      },
      wage: {
        title: '급여 계산기',
        calculator: {
          title: '급여 계산기',
          description: '호주 Fair Work 기준 준수 급여 계산',
          quickCheck: '빠른 확인',
          detailedCalculator: '상세 계산기',
          comparison: {
            title: '기능 비교',
            quick: {
              noAccount: '계정 불필요',
              basicCalculation: '기본 급여 계산',
              instant: '즉시 결과'
            },
            detailed: {
              profiles: '다중 직업 프로필',
              fairWork: 'Fair Work Australia 데이터',
              tracking: '일일 근무 추적',
              visaIntegration: '비자 일수 계산'
            }
          }
        },
        quickCheck: {
          title: '빠른 급여 확인',
          subtitle: '주간 수입에 대한 즉시 추정치를 받아보세요',
          hourlyRate: '시급',
          dailyHours: '일일 근무시간',
          daysPerWeek: '주당 근무일',
          calculate: '계산하기',
          calculating: '계산 중...',
          result: '주간 급여 추정',
          weeklyHours: '총 시간',
          regularPay: '기본 급여',
          overtimePay: '초과근무 수당',
          grossPay: '총 급여 (세전)',
          afterTax: '세후 (추정)',
          calculate_again: '다시 계산',
          fillAllFields: '모든 필드를 입력해주세요',
          invalidValues: '유효한 양수를 입력해주세요',
          disclaimer: '이것은 추정치일뿐입니다. 실제 급여는 어워드 조건, 위치 및 기타 요인에 따라 달라질 수 있습니다.',
          signUpPrompt: {
            title: '더 정확한 계산을 원하시나요?',
            description: 'Fair Work Australia 준수, 페널티 레이트, 비자 일수 계산이 포함된 상세 급여 추적을 위해 가입하세요.',
            button: '무료 가입'
          },
          feature: {
            title: '빠르고 간단한 급여 추정',
            description: '잠재 수입에 대한 대략적인 아이디어를 얻기에 완벽합니다. 가입 불필요, 즉시 결과.',
            noSignup: '가입 불필요',
            instant: '즉시',
            estimate: '추정'
          }
        },
        detailedCalculator: {
          title: '상세 급여 계산기',
          description: 'Fair Work 준수 및 비자 통합을 포함한 종합 급여 추적',
          comingSoon: '곧 출시',
          loginRequired: {
            title: '로그인 필요',
            description: '상세 급여 계산, 직업 프로필, 비자 일수 추적에 액세스하려면 로그인하세요.'
          }
        },
        detailedRequiresLogin: '상세 계산기는 로그인이 필요합니다. 지금 로그인하시겠습니까?'
      },
      visa: {
        title: '비자 연장 계산기',
        description: '세컨드/서드 비자 요건 달성 진행상황 추적'
      },
      community: {
        title: '커뮤니티',
        description: '동료 워킹홀리데이 참가자들과 연결'
      },
      profile: {
        title: '내 프로필',
        nickname: '닉네임',
        email: '이메일',
        joinDate: '가입일',
        settings: '설정',
        deleteAccount: '계정 삭제',
        suggestions: '피드백 보내기'
      },
      calendar: {
        title: '근무 캘린더',
        description: '일일 근무 시간 추적',
        addRecord: '근무 기록 추가',
        noRecords: '아직 근무 기록이 없습니다'
      },
      language: {
        select: '언어 선택',
        detected: '브라우저 언어가 {{language}}로 감지되었습니다. 변경하시겠습니까?',
        switch: '{{language}}로 변경',
        keepEnglish: '영어 유지',
        english: 'English',
        korean: '한국어',
        japanese: '日本語'
      }
    }
  },
  ja: {
    translation: {
      common: {
        loading: '読み込み中...',
        error: 'エラー',
        success: '成功',
        cancel: 'キャンセル',
        confirm: '確認',
        save: '保存',
        edit: '編集',
        delete: '削除',
        close: '閉じる',
        day: '日',
        days: '日',
        hour: '時間',
        hours: '時間',
        week: '週',
        weeks: '週'
      },
      nav: {
        home: 'ホーム',
        wageCalculator: '賃金計算機',
        visaCalculator: 'ビザ計算機',
        community: 'コミュニティ',
        profile: 'マイページ',
        calendar: 'カレンダー',
        admin: '管理者'
      },
      home: {
        welcomeBack: '{{name}}さん、おかえりなさい！',
        motivationalQuote: '"前進するすべてのステップは、現在の状況よりも大きく、より良いものを達成するためのステップです。"',
        quickActions: 'クイックアクション',
        quickWageCheck: 'クイック賃金チェック',
        quickWageCheckDesc: '登録なしで即座に賃金見積り',
        wageCalculator: '賃金計算機',
        wageCalculatorDesc: 'ジョブプロファイルを使った詳細計算',
        visaExtension: 'ビザ延長',
        visaExtensionDesc: '88/179日要件の追跡',
        features: {
          title: 'Working Holiday Mateを選ぶ理由？',
          accurate: 'Fair Work Australia準拠の計算',
          visa: '統合されたビザ延長追跡',
          community: '仲間のワーキングホリデー参加者とのつながり'
        },
        topEarners: {
          title: '今月のトップ収入者',
          noData: 'まだデータがありません'
        },
        cta: {
          title: '収入の追跡を始める準備はできていますか？',
          description: '私たちの賃金計算を信頼する何千人ものワーキングホリデー参加者に参加してください。',
          button: '無料で始める'
        }
      },
      auth: {
        signIn: 'ログイン',
        signOut: 'ログアウト',
        signInWithGoogle: 'Googleで続行',
        setupNickname: 'ニックネームの設定',
        nicknameLabel: 'ニックネームを選択',
        nicknamePlaceholder: 'ニックネームを入力',
        nicknameRequired: 'ニックネームが必要です',
        continueButton: '続行',
        welcomeTitle: 'Working Holiday Mateへようこそ！',
        setupDescription: '始めるためにニックネームを選択してください'
      },
      wage: {
        title: '賃金計算機',
        calculator: {
          title: '賃金計算機',
          description: 'オーストラリアFair Work基準準拠の賃金計算',
          quickCheck: 'クイックチェック',
          detailedCalculator: '詳細計算機',
          comparison: {
            title: '機能比較',
            quick: {
              noAccount: 'アカウント不要',
              basicCalculation: '基本賃金計算',
              instant: '即座の結果'
            },
            detailed: {
              profiles: '複数のジョブプロファイル',
              fairWork: 'Fair Work Australiaデータ',
              tracking: '日々の労働追跡',
              visaIntegration: 'ビザ日数計算'
            }
          }
        },
        quickCheck: {
          title: 'クイック賃金チェック',
          subtitle: '週間収入の即座見積もりを取得',
          hourlyRate: '時給',
          dailyHours: '日々の労働時間',
          daysPerWeek: '週当たりの労働日',
          calculate: '計算',
          calculating: '計算中...',
          result: '週間賃金見積もり',
          weeklyHours: '総時間',
          regularPay: '基本賃金',
          overtimePay: '残業代',
          grossPay: '総賃金（税前）',
          afterTax: '税後（見積もり）',
          calculate_again: '再計算',
          fillAllFields: 'すべてのフィールドを入力してください',
          invalidValues: '有効な正の数を入力してください',
          disclaimer: 'これは見積もりのみです。実際の賃金は労働条件、場所、その他の要因により異なる場合があります。',
          signUpPrompt: {
            title: 'より正確な計算をお望みですか？',
            description: 'Fair Work Australia準拠、ペナルティレート、ビザ日数計算を含む詳細な賃金追跡のためにサインアップしてください。',
            button: '無料サインアップ'
          },
          feature: {
            title: '迅速で簡単な賃金見積もり',
            description: '潜在的収入の大まかなアイデアを得るのに最適です。サインアップ不要、即座の結果。',
            noSignup: 'サインアップ不要',
            instant: '即座',
            estimate: '見積もり'
          }
        },
        detailedCalculator: {
          title: '詳細賃金計算機',
          description: 'Fair Work準拠とビザ統合を含む包括的な賃金追跡',
          comingSoon: '近日公開',
          loginRequired: {
            title: 'ログインが必要',
            description: '詳細な賃金計算、ジョブプロファイル、ビザ日数追跡にアクセスするにはログインしてください。'
          }
        },
        detailedRequiresLogin: '詳細計算機にはログインが必要です。今すぐログインしますか？'
      },
      visa: {
        title: 'ビザ延長計算機',
        description: 'セカンド/サードビザ要件の進行状況を追跡'
      },
      community: {
        title: 'コミュニティ',
        description: '仲間のワーキングホリデー参加者とつながる'
      },
      profile: {
        title: 'マイプロフィール',
        nickname: 'ニックネーム',
        email: 'メール',
        joinDate: '参加日',
        settings: '設定',
        deleteAccount: 'アカウント削除',
        suggestions: 'フィードバックを送信'
      },
      calendar: {
        title: '労働カレンダー',
        description: '日々の労働時間を追跡',
        addRecord: '労働記録を追加',
        noRecords: 'まだ労働記録がありません'
      },
      language: {
        select: '言語選択',
        detected: 'ブラウザ言語が{{language}}として検出されました。変更しますか？',
        switch: '{{language}}に変更',
        keepEnglish: '英語を維持',
        english: 'English',
        korean: '한국어',
        japanese: '日本語'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 