// firebase
export const SUCCESS_FIREBASE_PASSWORD_RESET_EMAIL_SENT = 'パスワード再設定メールが送信されました'
export const SUCCESS_FIREBASE_USER_DELETED = 'ユーザーが正常に削除されました'
export const ERROR_FIREBASE_INVALID_CREDENTIALS = 'メールアドレスまたはパスワードが正しくありません'
export const ERROR_FIREBASE_UNEXPECTED = '予期しないエラーが発生しました'
export const ERROR_FIREBASE_EMAIL_ALREADY_IN_USE = (email: string) => `${email}は既に別のアカウントで使用されています`
export const ERROR_FIREBASE_INVALID_USER_INFO = 'ユーザー情報の取得に失敗しました、再度ログインしてみてください'
export const ERROR_FIREBASE_AUTHENTICATION_FAILED = 'ユーザー認証に失敗しました。アプリを再起動してみてください'
export const ERROR_FIREBASE_PASSWORD_RESET_EMAIL_FAILED = 'パスワード再設定メールの送信に失敗しました'
export const ERROR_FIREBASE_USER_DELETION_FAILED = 'ユーザーの削除に失敗しました。再度お試しください'
export const ERROR_FIREBASE_USER_NOT_FOUND = '該当するユーザーが見つかりませんでした'
export const ERROR_FIREBASE_EMAIL_NOT_FOUND = 'ユーザーのメールアドレスが見つかりません。アプリを再起動してみてください'
export const ERROR_FIREBASE_RE_AUTHENTICATION_FAILED = '再認証に失敗しました。パスワードが間違っている可能性がありますので、確認してもう一度お試しください'

// userApi
export const ERROR_USER_REGISTRATION_FAILED = '新規アカウントの作成に失敗しました、再度試してみてください'
export const ERROR_USER_MY_PAGE_NAVIGATION_FAILED
  = '新規登録は完了しましたが、マイページへの移動に失敗しました。ログインページからログインしてください'
export const ERROR_USER_NOT_FOUND = '該当するユーザーが見つかりませんでした'
export const ERROR_USER_DELETION_FAILED = 'ユーザーの削除に失敗しました、再度試してみてください'
export const ERROR_SCHOOL_NOT_FOUND = '指定された学校が見つかりませんでした、再度試してみてください'
export const ERROR_LOGIN_FAILED = 'ログインに失敗しました'

// courseApi
export const SUCCESS_COURSE_CREATION = '新しい授業が登録されました'
export const SUCCESS_COURSE_UPDATE = '授業の情報が更新されました'
export const SUCCESS_COURSE_DELETION = '授業を削除しました'
export const ERROR_COURSE_CREATION_FAILED = '授業の作成に失敗しました、再度試してみてください'
export const ERROR_COURSE_UPDATE_FAILED = '授業の更新に失敗しました、再度試してみてください'
export const ERROR_COURSE_DELETION_FAILED = '授業の削除に失敗しました、再度試してみてください'
export const ERROR_COURSE_ALREADY_EXISTS = '同じ授業名は登録できません、別の授業名にしてください'
export const ERROR_COURSE_NOT_CREATOR_EDIT = 'あなたはこのコースの作成者ではないため、編集できません'
export const ERROR_COURSE_NOT_CREATOR_DELETE = 'あなたはこのコースの作成者ではないため、削除できません'
export const ERROR_INVALID_DATE_FORMAT = '無効な日付形式です'
export const MESSAGE_COURSE_DELETION = '削除すると以下の情報が全て失われます'

// userCourseApi
export const SUCCESS_COURSE_JOIN = '授業に参加しました'
export const SUCCESS_COURSE_EXIT = '授業から退出しました'
export const ERROR_COURSE_JOIN_FAILURE = '授業の参加に失敗しました、再度試してみてください'
export const ERROR_COURSE_JOIN_NOT_FOUND = '授業が見つかりませんでした、再度確認して入力してください'
export const ERROR_COURSE_ALREADY_JOINED = 'あなたは既にこの授業に参加しています'
export const ERROR_COURSE_EXIT_FAILURE = 'コースから退出できませんでした'
export const ERROR_COURSE_NOT_A_PARTICIPANT = 'あなたはこのコースの参加者ではないため、退出できません'
export const ERROR_COURSE_EXIT_NOT_FOUND = '該当するコースが存在しませんでした'
export const MESSAGE_COURSE_ENROLLMENT = '参加する授業のクラスコードを入力してください'
export const MESSAGE_COURSE_EXIT = '退出すると以下のことが起こります'

// CourseDateApi
// create
export const SUCCESS_COURSE_DATE_CREATION = '新しい授業日が登録されました'
export const ERROR_COURSE_DATE_CREATION_FAILED = '授業日の登録に失敗しました、再度試してみてください'
// update
export const SUCCESS_COURSE_DATE_UPDATE = '授業日の情報が更新されました'
export const SUCCESS_COURSE_DATE_REFLECTION_UPDATE = '振り返りの設定が更新されました'
export const ERROR_COURSE_DATE_CANNOT_UPDATE
  = '編集後の授業日と授業回が編集前と同じです、少なくとも一方を変更してください'
export const ERROR_COURSE_DATE_REFLECTION_CANNOT_UPDATE
  = 'あなたは授業の作成者ではないため、振り返りの設定を更新できません'
export const ERROR_COURSE_DATE_UPDATE_FAILED = '授業日の更新に失敗しました、再度試してみてください'
export const ERROR_COURSE_DATE_REFLECTION_UPDATE_FAILED = '振り返り設定の更新に失敗しました、再度試してみてください'

// delete
export const SUCCESS_COURSE_DATE_DELETION = '授業日を削除しました'
export const ERROR_COURSE_DATE_DELETION_FAILED = '授業日の削除に失敗しました、再度試してみてください'
export const ERROR_COURSE_DATE_CANNOT_DELETE = 'あなたは授業の作成者ではないため、授業日を削除できません'
// other
export const ERROR_COURSE_DATE_ALREADY_EXISTS = '入力した授業回は既に登録されています、別の授業回を入力してください'
export const ERROR_COURSE_DATE_NOT_FOUND
  = '授業日が存在しませんでした、一度画面を更新して、最新の情報を取得してみてください'

// announcementApi
export const SUCCESS_ANNOUNCEMENT_CREATION = 'お知らせが登録されました'
export const SUCCESS_ANNOUNCEMENT_UPDATE = 'お知らせが更新されました'
export const SUCCESS_ANNOUNCEMENT_DELETION = 'お知らせを削除しました'
export const ERROR_ANNOUNCEMENT_CREATION_FAILED = 'お知らせの登録に失敗しました、再度試してみてください'
export const ERROR_ANNOUNCEMENT_NOT_CREATOR = 'あなたは授業の作成者ではないのでお知らせを登録できません'
export const ERROR_ANNOUNCEMENT_UPDATE_FAILED = 'お知らせの更新に失敗しました、再度試してみてください'
export const ERROR_ANNOUNCEMENT_DELETION_FAILED = 'お知らせの削除に失敗しました、再度試してみてください'
export const ERROR_ANNOUNCEMENT_NOT_FOUND
  = 'お知らせが存在しませんでした、一度画面を更新して、最新の情報を取得してみてください'
export const ERROR_ANNOUNCEMENT_CANNOT_UPDATE = 'あなたは授業の作成者ではないため、お知らせを編集できません'
export const ERROR_ANNOUNCEMENT_CANNOT_DELETE = 'あなたは授業の作成者ではないため、お知らせを削除できません'
export const MESSAGE_ANNOUNCEMENT_DELETION = '削除したお知らせ元に戻すことはできません'

// promptApi
export const SUCCESS_PROMPT_CREATION = 'プロンプトが登録されました'
export const SUCCESS_PROMPT_UPDATE = 'プロンプトが更新されました'
export const SUCCESS_PROMPT_ENABLE = (title: string) => `${title}を有効にしました`
export const SUCCESS_PROMPT_DISABLED = (title: string) => `${title}を無効にしました`
export const SUCCESS_PROMPT_DELETION = 'プロンプトを削除しました'
export const ERROR_PROMPT_CREATION_FAILED = 'プロンプトの登録に失敗しました、再度試してみてください'
export const ERROR_PROMPT_NOT_CREATOR = 'あなたは授業の作成者ではないのでプロンプトを登録できません'
export const ERROR_PROMPT_UPDATE_FAILED = 'プロンプトの更新に失敗しました、再度試してみてください'
export const ERROR_PROMPT_SET_FAILED = '選択したプロンプトのセットに失敗しました、再度試してみてください'
export const ERROR_PROMPT_DELETION_FAILED = 'プロンプトの削除に失敗しました、再度試してみてください'
export const ERROR_PROMPT_NOT_FOUND
  = 'プロンプトが存在しませんでした、一度画面を更新して、最新の情報を取得してみてください'
export const ERROR_PROMPT_CANNOT_UPDATE = 'あなたは授業の作成者ではないため、プロンプトを編集できません'
export const ERROR_PROMPT_CANNOT_DELETE = 'あなたは授業の作成者ではないため、プロンプトを削除できません'
export const MESSAGE_PROMPT_ENABLE = '選択した振り返りを有効にしますか？'
export const MESSAGE_PROMPT_DISABLE = '選択した振り返りを無効にしますか？'
export const MESSAGE_PROMPT_DISABLE_WARNING = 'この操作を行うと、現在有効な振り返りは無効になります'
export const MESSAGE_PROMPT_DELETION = '削除した振り返りは元に戻すことはできません'

// reflectionApi
// create
export const SUCCESS_REFLECTION_CREATION = '振り返りが登録されました'
export const ERROR_REFLECTION_CREATION_FAILED = '振り返りの登録に失敗しました、もう一度初めからお試しください'
// update
export const SUCCESS_REFLECTION_UPDATE = '振り返りが更新されました'
export const ERROR_REFLECTION_CANNOT_UPDATE = '振り返り内容に変更は見られません、再確認をお願いします'
export const ERROR_REFLECTION_UPDATE_FAILED = '振り返りの更新に失敗しました、再度試してみてください'
// other
export const ERROR_REFLECTION_NOT_FOUND
  = '振り返りが存在しませんでした、一度画面を更新して、最新の情報を取得してみてください'

// other
export const UNEXPECTED_ERROR_MESSAGE = '予期しないエラーが発生しました、ページをリロードしてみてください'
export const MESSAGE_DELETION = '本当に削除してもよろしいですか？'
export const REDIRECT_URL = 'https://www.recaplearning.com'
export const PASSWORD_RESET_MESSAGE = '登録済みメールアドレスにパスワード再設定用リンクを送信しますか？'
export const ACCOUNT_DELETION_MESSAGE = 'アカウントを退会すると、以下のことが発生します'

export const TEACHER_SIDEBAR_MENU_ITEMS = [
  {
    value: 1,
    title: 'ホーム',
    iconName: 'fluent-mdl2:home',
    path: 'teacher'
  }
]

export const STUDENT_SIDEBAR_MENU_ITEMS = [
  {
    value: 1,
    title: 'ホーム',
    iconName: 'fluent-mdl2:home',
    path: 'student'
  }
]

export const DAYS_OF_THE_WEEK = [
  { value: 1, text: '月曜日' },
  { value: 2, text: '火曜日' },
  { value: 3, text: '水曜日' },
  { value: 4, text: '木曜日' },
  { value: 5, text: '金曜日' },
  { value: 6, text: '土曜日' },
  { value: 7, text: '日曜日' }
]

export const COURSE_SCHEDULE = [
  { value: 1, text: '1限' },
  { value: 2, text: '2限' },
  { value: 3, text: '3限' },
  { value: 4, text: '4限' },
  { value: 5, text: '5限' },
  { value: 6, text: '6限' },
  { value: 7, text: '7限' }
]

export const USER_TYPES = [
  { value: 0, text: '学生' },
  { value: 1, text: '教員' }
]

export const ACCOUNT_SETTINGS = [
  { value: 1, text: 'パスワード変更', iconName: 'mdi:key' },
  { value: 2, text: '退会', iconName: 'fluent:person-delete-20-filled' }
]

export const TEACHER_COURSE_SETTINGS = [
  { value: 1, text: '編集' },
  { value: 2, text: '削除' }
]

export const NO_COURSE_DATE_SETTINGS = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '授業日の追加' }
]

export const COURSE_DATE_ADDED_NO_REFLECTION_SETTINGS = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '振り返りの設定' },
  { value: 3, text: '授業日の編集' },
  { value: 4, text: '授業日の削除' }
]

export const COURSE_DATE_AND_REFLECTION_ADDED_SETTINGS = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '授業日の削除' }
]

export const TEACHER_PROMPT_SETTINGS = [
  { value: 1, text: '編集' },
  { value: 2, text: '状態変更' },
  { value: 3, text: '削除' }
]

export const TEACHER_TABS = [
  { id: 1, text: 'お知らせ' },
  { id: 2, text: '振り返り' },
  { id: 3, text: '受講生振り返り履歴' }
]

export const STUDENT_TABS = [
  { id: 1, text: 'お知らせ' },
  { id: 2, text: '振り返り履歴' },
  { id: 3, text: 'みんなの振り返り' }
]

export const STUDENT_COURSE_SETTING = [{ value: 1, text: '退出' }]

// ルーティング名
export const TEACHER_COURSE_DETAIL: string = 'teacher-course-id'
export const STUDENT_COURSE_DETAIL: string = 'student-course-id'

// アイコン
export const CALENDAR_ICON = 'calendar' as const
export const TIMETABLE_ICON = 'timetable' as const

export const EXAMPLE_PROMPT = '今日学んだことで理解できなかったことは何ですか？'

// Chat
export const START_CHAT_MESSAGES = ['こんにちは！', '振り返りを始めましょう！']
export const END_CHAT_MESSAGE = 'お疲れ様でした！'
export const COMPLETE_CHAT_MESSAGES = [
  '本日の振り返りは登録済みです！お疲れ様でした。',
  '振り返り履歴から今日の学びを確認してみてください。',
  '次回も一緒に頑張りましょう！'
]
export const PENDING_CHAT_MESSAGES = ['本日の振り返りはまだ公開されていません。', 'もう少々お待ちください。']
export const NO_CHAT_MESSAGES = [
  '本日の振り返りはありません。',
  '余裕があれば、これまでの振り返りを見直してみてはいかがでしょうか。',
  '次回の振り返りでまたお会いしましょう！'
]

// テーブル
export const TABLE_STATUSES = [
  { value: 1, name: 'gg:math-minus', color: 'gray', text: '：未開始' },
  { value: 2, name: 'gg:close-r', color: 'orange', text: '：振り返り未実施' },
  { value: 3, name: 'gg:check-o', color: 'green', text: '：記入あり' },
  { value: 4, name: 'gg:close-o', color: 'red', text: '：記入なし' }
]

// ページのメタ情報を設定用
export const LOGIN_META = {
  title: 'ログイン',
  meta: [
    {
      name: 'description',
      content: 'ログインページです。ReCapにログインして、授業の振り返りや学習管理をしましょう。'
    }
  ]
}

export const SIGNUP_META = {
  title: '新規登録',
  meta: [
    {
      name: 'description',
      content: '新規登録ページです。ReCapに新規登録して、授業の振り返りを手軽に始めてみませんか。数分で新しいアカウントを作成できます。'
    }
  ]
}

export const FORGOT_PASSWORD_META = {
  title: 'パスワード再設定',
  meta: [
    {
      name: 'description',
      content: 'パスワード再設定ページです。新しいパスワードを作成してアカウントに再度アクセスしましょう。'
    }
  ]
}

export const TERMS_OF_SERVICE_META = {
  title: '利用規約',
  meta: [
    {
      name: 'description',
      content: '本サービスの利用条件を定めた利用規約ページです。ユーザーは本規約に従って本サービスをご利用いただきます。'
    }
  ]
}

export const PRIVACY_POLICY_META = {
  title: 'プライバシーポリシー',
  meta: [
    {
      name: 'description',
      content: '本サービスのプライバシーポリシーページです。ユーザーの個人情報の取り扱いについて説明しています。'
    }
  ]
}

export const TEACHER_COURSE_LIST_META = {
  title: '担当授業一覧',
  meta: [
    {
      name: 'description',
      content: '教員が担当する授業の一覧ページです。授業の詳細や管理ができます。'
    }
  ]
}

export const TEACHER_COURSE_META = (title: string) => {
  return {
    title: title,
    meta: [
      {
        name: 'description',
        content: `${title}の授業ページです。振り返りのプロンプトの作成や、学生の振り返り履歴を閲覧することができます。`
      }
    ]
  }
}

export const STUDENT_COURSE_LIST_META = {
  title: '受講一覧',
  meta: [
    {
      name: 'description',
      content: '学生が受講する授業の一覧ページです。授業への参加や退出ができます。'
    }
  ]
}

export const STUDENT_COURSE_META = (title: string) => {
  return {
    title: title,
    meta: [
      {
        name: 'description',
        content: `${title}の授業ページです。授業の振り返りや自分の振り返り履歴を閲覧することができます。`
      }
    ]
  }
}

export const NOT_FOUND_META = {
  title: 'ページが見つかりませんでした',
  meta: [
    {
      name: 'description',
      content: 'お探しのページが見つかりませんでした。URLが正しいかご確認ください。'
    }
  ]
}

// フッター
export const POLICY_LINKS = [
  { value: 1, name: '利用規約', path: 'terms' },
  { value: 2, name: 'プライバシーポリシー', path: 'privacy' }
]

export const SNS_LINKS = [
  { value: 1, path: 'https://github.com/kaseispace', iconName: 'fe:github', iconSize: '18px' },
  { value: 2, path: 'https://x.com/kaseispace', iconName: 'prime:twitter', iconSize: '16px' }
]

// ウェルカムページ
export const APP_FLOW_STEPS = [
  {
    timing: '授業開始前',
    userType: '教員',
    stepNumber: 'STEP1',
    imagePath: 'recap-schedule_wpnox4.png',
    subtitle: '授業日の登録'
  },
  {
    timing: '授業開始前',
    userType: '教員',
    stepNumber: 'STEP2',
    imagePath: 'recap-prompt-management_hcukme.png',
    subtitle: 'プロンプトの作成・公開'
  },
  {
    timing: '授業中',
    userType: '学生',
    stepNumber: 'STEP3',
    imagePath: 'recap-reflection_wielix.png',
    subtitle: '振り返りの登録'
  },
  {
    timing: '振り返り終了後',
    userType: '教員・学生',
    stepNumber: 'STEP4',
    imagePath: 'recap-reflection-history_kpmexb.png',
    subtitle: 'フィードバックの確認',
    subtitleAlt: '（振り返りの確認）'
  }
]

export const FEATURE_DETAILS = [
  {
    name: 'プロンプト機能',
    description: [
      'プロンプト機能は、担当授業の教員が独自の質問を作成し、学生の振り返りを促すためのツールです。授業の目的や進行に応じて、毎回同じ質問を使うことも、単元や授業の回ごとに異なる質問を設定することもできます。',
      'また、複数の質問を登録可能で、学生は教員が用意したプロンプトに沿って振り返りを進めることで、学びを整理しやすくなります。教員の判断に応じて、授業スタイルに合わせた振り返りを設計できるため、柔軟な運用が可能です。'
    ],
    imagePath: 'recap-prompt_jlp7wo.png',
    isImageFirst: true
  },
  {
    name: '振り返り機能',
    description: [
      '振り返り機能は、授業後の学びを整理し、学生が自身の理解を深めるためのツールです。アプリ内のチャットアイコンをクリックすると振り返りが開始され、プロンプト機能を使って教員が作成した質問に沿って進められます。',
      '振り返りが完了すると登録内容は履歴ページに保存され、後から確認可能です。また、AIのフィードバックを受けることで、新たな視点やアドバイスを得て、学びをさらに深めることができます。 これにより、次回の授業に向けた準備や継続的な成長をサポートします。'
    ],
    imagePath: 'recap-reflection-page.jpg_womndh.png',
    isImageFirst: false
  },
  {
    name: 'みんなの振り返り機能',
    description: [
      'みんなの振り返り機能は、他の学生の振り返りを閲覧できるツールです。他の学生がどのように授業を振り返っているかを知ることで、新しい視点を得たり、自分の学びに役立てることができます。',
      '画面には振り返りの一部が一覧表示され、カードをクリックすると、質問や省略された部分を含む詳細が表示されます。気になった振り返りをじっくり読むことで、異なる視点を知り、自分の学びに活かせます。'
    ],
    imagePath: 'recap-shared-reflections.jpg_rdfhxb.png',
    isImageFirst: true
  },
  {
    name: '振り返り履歴閲覧機能',
    description: [
      '振り返り履歴閲覧機能は、教員が各学生の振り返り状況を確認できるツールです。授業後の学習状況を把握し、適切なフォローを行うのに役立ちます。',
      '授業回ごとの振り返り一覧では、記入済みはチェックマーク、未記入はバツ印で表示され、進捗をひと目で確認できます。学生名をクリックするとその学生の振り返り内容を閲覧でき、個々の学習の様子を詳細に把握することも可能です。',
      'また、記入率を示すグラフにより、授業回ごとの振り返り状況を視覚的に把握でき、全体の傾向を確認しながら指導に活用できます。'
    ],
    imagePath: 'recap-review-dashboard_ydfzhe.png',
    isImageFirst: false
  }
]
