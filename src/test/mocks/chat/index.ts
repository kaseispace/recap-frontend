export const MOCK_CHAT_MESSAGES = [
  { message_type: 'bot', message: 'こんちは！', message_time: 0 },
  { message_type: 'bot', message: '振り返りを始めましょう！', message_time: 0 }
]

export const MOCK_START_CHAT_MESSAGES = [
  { message_type: 'bot', message: 'こんにちは！', message_time: 0, isLoading: false },
  { message_type: 'bot', message: '振り返りを始めましょう！', message_time: 0, isLoading: false },
  { message_type: 'bot', message: 'お疲れ様でした！', message_time: 0, isLoading: false }
]

export const MOCK_NO_CHAT_MESSAGES = [
  { message_type: 'bot', message: '本日の振り返りはありません。', message_time: 0, isLoading: false },
  {
    message_type: 'bot',
    message: '余裕があれば、これまでの振り返りを見直してみてはいかがでしょうか。',
    message_time: 0,
    isLoading: false
  },
  { message_type: 'bot', message: '次回の振り返りでまたお会いしましょう！', message_time: 0, isLoading: false }
]

export const MOCK_PENDING_CHAT_MESSAGES = [
  { message_type: 'bot', message: '本日の振り返りはまだ公開されていません。', message_time: 0, isLoading: false },
  { message_type: 'bot', message: 'もう少々お待ちください。', message_time: 0, isLoading: false }
]

export const MOCK_COMPLETE_CHAT_MESSAGES = [
  { message_type: 'bot', message: '本日の振り返りは登録済みです！お疲れ様でした。', message_time: 0, isLoading: false },
  {
    message_type: 'bot',
    message: '振り返り履歴から今日の学びを確認してみてください。',
    message_time: 0,
    isLoading: false
  },
  { message_type: 'bot', message: '次回も一緒に頑張りましょう！', message_time: 0, isLoading: false }
]

export const MOCK_CURRENT_PROMPTS = [
  '今日の授業で最も印象に残った点は何でしたか？',
  '今日学んだ内容を自分の言葉で簡潔に説明してみてください。',
  '今日の授業で理解が難しかった部分は何でしたか？それはなぜですか？'
]

export const CHAT_HISTORY_AFTER_NEXT_BOT_MESSAGES = [
  { message_type: 'bot', message: 'こんちは！', message_time: 0 },
  { message_type: 'bot', message: '振り返りを始めましょう！', message_time: 0 },
  { message_type: 'bot', message: '今日の授業で最も印象に残った点は何でしたか？', message_time: 0, isLoading: false }
]

export const MOCK_END_CHAT_MESSAGE = {
  message_type: 'bot',
  message: 'お疲れ様でした！',
  message_time: 0,
  isLoading: false
}
