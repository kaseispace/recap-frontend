describe('バリデーションテスト', () => {
  describe('LoginFormSchemaのテスト', () => {
    it('emailが空の場合、エラーが発生', () => {
      const testValues = {
        email: '',
        password: 'password'
      }

      expect(() => {
        LoginFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('emailの形式が合わない場合、エラーが発生', () => {
      const testValues = {
        email: 'test.email',
        password: 'password'
      }

      expect(() => {
        LoginFormSchema.validateSync(testValues)
      }).toThrow('メールアドレスの形式で入力してください')
    })

    it('passwordが空の場合、エラーが発生', () => {
      const testValues = {
        email: 'mail@sample.com',
        password: ''
      }

      expect(() => {
        LoginFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValues = {
        email: 'mail@sample.com',
        password: 'password'
      }

      expect(() => {
        LoginFormSchema.validateSync(testValues)
      }).not.toThrow()
    })
  })

  describe('SignUpFormSchemaのテスト', () => {
    it('nameが空の場合、エラーが発生', () => {
      const testValues = {
        name: '',
        email: 'mail@sample.com',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('emailが空の場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: '',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('emailの形式が合わない場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'test.email',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('メールアドレスの形式で入力してください')
    })

    it('passwordが空の場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: '',
        passwordConfirm: '',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('passwordが7文字以下の場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: 'pass',
        passwordConfirm: 'pass',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('8文字以上で入力してください')
    })

    it('passwordとpasswordConfirmが一致しない場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: 'password',
        passwordConfirm: 'pass1234',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('パスワードが一致しません')
    })

    it('roleTextが空の場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('schoolNameが空の場合、エラーが発生', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '学生',
        schoolName: ''
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValues = {
        name: '佐藤太郎',
        email: 'mail@sample.com',
        password: 'password',
        passwordConfirm: 'password',
        roleText: '学生',
        schoolName: 'テスト大学'
      }

      expect(() => {
        SignUpFormSchema.validateSync(testValues)
      }).not.toThrow()
    })
  })

  describe('CourseFormSchemaのテスト', () => {
    it('nameが空の場合、エラーが発生', () => {
      const testValues = {
        name: '',
        teacherName: '教師太郎',
        dayOfWeek: '月曜日',
        courseTime: '3限'
      }

      expect(() => {
        CourseFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('teacherNameが空の場合、エラーが発生', () => {
      const testValues = {
        name: 'データサイエンス',
        teacherName: '',
        dayOfWeek: '月曜日',
        courseTime: '3限'
      }

      expect(() => {
        CourseFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('dayOfWeekが空の場合、エラーが発生', () => {
      const testValues = {
        name: 'データサイエンス',
        teacherName: '教師太郎',
        dayOfWeek: '',
        courseTime: '3限'
      }

      expect(() => {
        CourseFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('courseTimeが空の場合、エラーが発生', () => {
      const testValues = {
        name: 'データサイエンス',
        teacherName: '教師太郎',
        dayOfWeek: '月曜日',
        courseTime: ''
      }

      expect(() => {
        CourseFormSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValues = {
        name: 'データサイエンス',
        teacherName: '教師太郎',
        dayOfWeek: '月曜日',
        courseTime: '3限'
      }

      expect(() => {
        CourseFormSchema.validateSync(testValues)
      }).not.toThrow('必須項目です')
    })
  })

  describe('CourseDateSchemaのテスト', () => {
    it('courseSessionが空の場合、エラーが発生', () => {
      const testValues = {
        courseSession: '',
        courseDate: '2024/4/1'
      }

      expect(() => {
        CourseDateSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('courseSessionが半角数値以外が入力された場合、エラーが発生', () => {
      const testValues = {
        courseSession: '第1回',
        courseDate: '2024/4/1'
      }

      expect(() => {
        CourseDateSchema.validateSync(testValues)
      }).toThrow('半角数字を入力してください')
    })

    it('courseDateが空の場合、エラーが発生', () => {
      const testValues = {
        courseSession: '1',
        courseDate: ''
      }

      expect(() => {
        CourseDateSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValues = {
        courseSession: '1',
        courseDate: '2024/4/1'
      }

      expect(() => {
        CourseDateSchema.validateSync(testValues)
      }).not.toThrow()
    })
  })

  describe('CourseCodeSchemaのテスト', () => {
    it('courseCodeが空の場合、エラーが発生', () => {
      const testValue = {
        courseCode: ''
      }

      expect(() => {
        CourseCodeSchema.validateSync(testValue)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValue = {
        courseCode: 'haY6d8Y'
      }

      expect(() => {
        CourseCodeSchema.validateSync(testValue)
      }).not.toThrow()
    })
  })

  describe('AnnouncementSchemaのテスト', () => {
    it('contentが空の場合、エラーが発生', () => {
      const testValue = {
        content: ''
      }

      expect(() => {
        AnnouncementSchema.validateSync(testValue)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValue = {
        content: '来週の授業は休校です。'
      }

      expect(() => {
        AnnouncementSchema.validateSync(testValue)
      }).not.toThrow()
    })
  })

  describe('PromptSchemaのテスト', () => {
    it('titleが空の場合、エラーが発生', () => {
      const testValues = {
        title: '',
        content: '今日の授業で一番印象に残ったことは何でしたか？'
      }

      expect(() => {
        PromptSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('contentが空の場合、エラーが発生', () => {
      const testValues = {
        title: '第1回目の振り返り',
        content: ''
      }

      expect(() => {
        PromptSchema.validateSync(testValues)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValues = {
        title: '第1回目の振り返り',
        content: '今日の授業で一番印象に残ったことは何でしたか？'
      }

      expect(() => {
        PromptSchema.validateSync(testValues)
      }).not.toThrow()
    })
  })

  describe('ReflectionSchemaのテスト', () => {
    it('messageが空の場合、エラーが発生', () => {
      const testValue = {
        message: ''
      }

      expect(() => {
        ReflectionSchema.validateSync(testValue)
      }).toThrow('必須項目です')
    })

    it('エラーが発生しない', () => {
      const testValue = {
        message:
            '今日の授業で特に印象的だったのは、グループディスカッションでの活発な意見交換です。他の学生の視点を聞くことで、自分の考え方を広げることができました。'
      }

      expect(() => {
        ReflectionSchema.validateSync(testValue)
      }).not.toThrow()
    })
  })

  describe('PasswordResetSchemaのテスト', () => {
    it('emailが空の場合、エラーが発生', () => {
      const testValue = {
        email: ''
      }

      expect(() => {
        PasswordResetSchema.validateSync(testValue)
      }).toThrow('必須項目です')
    })

    it('emailの形式が合わない場合、エラーが発生', () => {
      const testValues = {
        email: 'test.email'
      }

      expect(() => {
        PasswordResetSchema.validateSync(testValues)
      }).toThrow('メールアドレスの形式で入力してください')
    })
  })

  describe('AccountDeletionSchemaのテスト', () => {
    it('passwordが空の場合、エラーが発生', () => {
      const testValue = {
        password: ''
      }

      expect(() => {
        AccountDeletionSchema.validateSync(testValue)
      }).toThrow('必須項目です')
    })
  })
})
