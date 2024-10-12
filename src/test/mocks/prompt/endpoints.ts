import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { emptyDataUUID, dataUUID } from '@/test/mocks/index'
import { mockPromptsData, mockStudentPromptsData } from '@/test/mocks/prompt/index'
import type { promptRequestBody } from '@/test/mocks/prompt/index'

const config = useRuntimeConfig()

export const registerPromptEndpoints = () => {
  registerEndpoint(`${config.public.devBackendUrl}/prompts/teacher_prompts?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/teacher_prompts?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockPromptsData
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/student_prompt?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/student_prompt?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockStudentPromptsData
    }
  })

  // プロンプトの作成
  registerEndpoint(`${config.public.devBackendUrl}/prompts`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<promptRequestBody>(event)
      return {
        id: 1,
        title: body.title,
        activate: false,
        prompt_questions: body.contents
      }
    }
  })

  // プロンプトの状態の更新
  registerEndpoint(`${config.public.devBackendUrl}/prompts/2/activate_prompt`, {
    method: 'PATCH',
    handler: () => {
      const prompt = usePromptApi()
      const activePrompt = prompt.prompts.value?.find(prompt => prompt.id === 2)
      return {
        id: activePrompt?.id,
        title: activePrompt?.title,
        activate: !activePrompt?.active,
        prompt_questions: activePrompt?.prompt_questions
      }
    }
  })

  // プロンプトの編集
  registerEndpoint(`${config.public.devBackendUrl}/prompts/1`, {
    method: 'PATCH',
    handler: async (event) => {
      const prompt = usePromptApi()
      const body = await readBody<promptRequestBody>(event)
      if (prompt.prompts.value) {
        return {
          id: prompt.prompts.value[0].id,
          title: body.title,
          active: prompt.prompts.value[0].active,
          prompt_questions: body.contents
        }
      }
    }
  })

  // プロンプトの削除
  registerEndpoint(`${config.public.devBackendUrl}/prompts/1`, {
    method: 'DELETE',
    handler: () => {
      const prompt = usePromptApi()
      const deletePrompt = prompt.prompts.value?.find(prompt => prompt.id === 1)
      if (deletePrompt) {
        return {}
      }
    }
  })
}