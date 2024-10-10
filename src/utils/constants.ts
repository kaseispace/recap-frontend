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

// userApi
export const ERROR_USER_REGISTRATION_FAILED = '新規アカウントの作成に失敗しました、再度試してみてください'
export const ERROR_USER_MY_PAGE_NAVIGATION_FAILED
  = '新規登録は完了しましたが、マイページへの移動に失敗しました。ログインページからログインしてください'
export const ERROR_USER_NOT_FOUND = '該当するユーザーが見つかりませんでした'
export const ERROR_USER_DELETION_FAILED = 'ユーザーの削除に失敗しました、再度試してみてください'
export const ERROR_SCHOOL_NOT_FOUND = '指定された学校が見つかりませんでした、再度試してみてください'
export const ERROR_LOGIN_FAILED = 'ログインに失敗しました'

// courseApi
export const SUCCESS_COURSE_CREATION = '新しい授業が登録されました。'
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
export const ERROR_COURSE_EXIT_FAILURE = 'コースから退出できませんでした。'
export const ERROR_COURSE_NOT_A_PARTICIPANT = 'あなたはこのコースの参加者ではないため、退出できません。'
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
export const REDIRECT_URL = 'http://localhost:3001'
export const PASSWORD_RESET_MESSAGE = '登録済みメールアドレスにパスワード再設定用リンクを送信しますか？'
export const ACCOUNT_DELETION_MESSAGE = 'アカウントを退会すると、以下のことが発生します'

export const teacherSidebarMenuItems = [
  {
    value: 1,
    title: 'ホーム',
    iconName: 'fluent-mdl2:home',
    path: 'teacher',
  },
]

export const studentSidebarMenuItems = [
  {
    value: 1,
    title: 'ホーム',
    iconName: 'fluent-mdl2:home',
    path: 'student',
  },
]

export const semester = [
  { value: 1, text: '前期' },
  { value: 2, text: '後期' },
  { value: 3, text: 'その他' },
]

export const dayOfTheWeek = [
  { value: 1, text: '月曜日' },
  { value: 2, text: '火曜日' },
  { value: 3, text: '水曜日' },
  { value: 4, text: '木曜日' },
  { value: 5, text: '金曜日' },
  { value: 6, text: '土曜日' },
  { value: 7, text: '日曜日' },
]

export const schedule = [
  { value: 1, text: '1限' },
  { value: 2, text: '2限' },
  { value: 3, text: '3限' },
  { value: 4, text: '4限' },
  { value: 5, text: '5限' },
  { value: 6, text: '6限' },
  { value: 7, text: '7限' },
]

export const userTypes = [
  { value: 0, text: '学生' },
  { value: 1, text: '教員' },
]

export const accountSetting = [
  { value: 1, text: 'パスワード変更', iconName: 'mdi:key' },
  { value: 2, text: '退会', iconName: 'fluent:person-delete-20-filled' },
]

export const teacherCourseSetting = [
  { value: 1, text: '編集' },
  { value: 2, text: '削除' },
]

export const NoCourseDateSettings = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '授業日の追加' },
]

export const CourseDateAddedNoReflectionSettings = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '振り返りの設定' },
  { value: 3, text: '授業日の編集' },
  { value: 4, text: '授業日の削除' },
]

export const CourseDateAndReflectionAddedSettings = [
  { value: 1, text: 'クラスコード' },
  { value: 2, text: '授業日の削除' },
]

export const teacherPromptSetting = [
  { value: 1, text: '編集' },
  { value: 2, text: '状態変更' },
  { value: 3, text: '削除' },
]

export const teacherTabs = [
  { id: 1, text: 'お知らせ' },
  { id: 2, text: '振り返り' },
  { id: 3, text: '受講生振り返り履歴' },
]

export const studentTabs = [
  { id: 1, text: 'お知らせ' },
  { id: 2, text: '振り返り履歴' },
]

export const studentCourseSetting = [{ value: 1, text: '退出' }]

// ルーティング名
export const TeacherCourseDetail: string = 'teacher-course-id'
export const StudentCourseDetail: string = 'student-course-id'

// アイコン
export const calendarIcon = 'calendar' as const
export const timetableIcon = 'timetable' as const

export const examplePrompt = '今日学んだことで理解できなかったことは何ですか？'

// Chat
export const startChatMessage = ['こんにちは！', '振り返りを始めましょう！']
export const endChatMessage = 'お疲れ様でした！'
export const completeChatMessage = [
  '本日の振り返りは登録済みです！お疲れ様でした。',
  '振り返り履歴から今日の学びを確認してみてください。',
  '次回も一緒に頑張りましょう！',
]
export const pendingChatMessage = ['本日の振り返りはまだ公開されていません。', 'もう少々お待ちください。']
export const noChatMessage = [
  '本日の振り返りはありません。',
  '余裕があれば、これまでの振り返りを見直してみてはいかがでしょうか。',
  '次回の振り返りでまたお会いしましょう！',
]

// テーブル
export const TABLE_STATUS = [
  { value: 1, name: 'gg:math-minus', color: 'gray', text: '：未開始' },
  { value: 2, name: 'gg:close-r', color: 'orange', text: '：振り返り未実施' },
  { value: 3, name: 'gg:check-o', color: 'green', text: '：記入あり' },
  { value: 4, name: 'gg:close-o', color: 'red', text: '：記入なし' },
]

// テスト用
export const mockPrompts = [
  { id: 1, content: '今日のJavaScriptの学習で、新たに覚えた構文は何ですか？' },
  { id: 2, content: 'その構文をどのような場面で使用しましたか？' },
  { id: 3, content: 'その他、授業への質問等はありますか？' },
]