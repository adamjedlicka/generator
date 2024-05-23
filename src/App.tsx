import { useState } from 'react'
import { ChatOpenAI } from '@langchain/openai'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'

function App() {
  const [query, setQuery] = useState('Generate me an address form with street, city and country inputs')
  const [output, setOutput] = useState<object>({})

  const generate = async (e) => {
    e.preventDefault()

    const model = new ChatOpenAI({
      apiKey: '',
      model: 'gpt-3.5-turbo',
      temperature: 0,
    })

    const formatInstructions = 'Respond with a valid JSON object.'

    const parser = new JsonOutputParser()

    const prompt = ChatPromptTemplate.fromTemplate(
      'Answer the user query.\n{format_instructions}\n{json_schema}\n{query}\n'
    )

    const partialedPrompt = await prompt.partial({
      format_instructions: formatInstructions,
      json_schema: JSON.stringify(schema()),
    })

    const chain = partialedPrompt.pipe(model).pipe(parser)

    for await (const s of await chain.stream({ query })) {
      setOutput(s)
    }
  }

  return (
    <div>
      <form onSubmit={generate}>
        <textarea value={query} rows={10} style={{ width: 500 }} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Generate</button>
      </form>
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  )
}

export default App

const schema = () => ({
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  type: 'object',
  properties: {
    elements: {
      type: 'array',
      items: {
        $ref: '#/$defs/elements',
      },
    },
  },
  $defs: {
    'elements': {
      oneOf: [
        {
          $ref: '#/$defs/@finshape/alfons-element-accordion',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-card',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-card-actions',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-card-content',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-card-header',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-checkbox',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-column',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-content-slot',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-drawer',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-embedded-component',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-form',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-grid',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-grid-item',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-input',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-radio-group',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-row',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-select',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-slider',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-stack',
        },
        {
          $ref: '#/$defs/@finshape/alfons-element-switch',
        },
      ],
    },
    '@finshape': {
      'alfons-element-accordion': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-accordion',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              defaultExpanded: {
                type: 'boolean',
              },
              disabled: {
                type: 'boolean',
              },
              elevation: {
                type: 'integer',
                minimum: 0,
                maximum: 24,
              },
              expanded: {
                type: 'boolean',
              },
              heading: {
                type: 'string',
              },
              square: {
                type: 'boolean',
              },
              variant: {
                type: ['string'],
                enum: ['elevation', 'outlined'],
              },
            },
          },
        },
      },
      'alfons-element-card': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-card',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              variant: {
                type: ['string'],
                enum: ['elevation', 'outlined'],
              },
              elevation: {
                type: 'integer',
                minimum: 0,
                maximum: 24,
              },
              square: {
                type: 'boolean',
              },
            },
          },
        },
      },
      'alfons-element-card-actions': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-card-actions',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {},
          },
        },
      },
      'alfons-element-card-content': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-card-content',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {},
          },
        },
      },
      'alfons-element-card-header': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-card-header',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
              },
              subheader: {
                type: 'string',
              },
            },
          },
        },
      },
      'alfons-element-checkbox': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-checkbox',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'default'],
              },
              defaultChecked: {
                type: 'boolean',
              },
              disabled: {
                type: 'boolean',
              },
              label: {
                type: 'string',
              },
              labelPlacement: {
                type: ['string'],
                enum: ['bottom', 'end', 'start', 'top'],
              },
              size: {
                type: ['string'],
                enum: ['small', 'medium'],
              },
              shape: {
                type: ['string'],
                enum: ['square', 'circle'],
              },
            },
          },
        },
      },
      'alfons-element-column': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-column',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {},
          },
        },
      },
      'alfons-element-content-slot': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-content-slot',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {},
          },
        },
      },
      'alfons-element-drawer': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-drawer',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              anchor: {
                type: ['string'],
                enum: ['left', 'right'],
              },
              appBar: {
                type: 'boolean',
              },
              width: {
                type: 'number',
              },
            },
          },
        },
      },
      'alfons-element-embedded-component': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-embedded-component',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              componentId: {
                type: 'string',
              },
            },
          },
        },
      },
      'alfons-element-form': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-form',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
              },
              validationModeAfterSubmit: {
                type: ['string'],
                enum: ['onChange', 'onBlur', 'onSubmit'],
              },
              validationModeBeforeSubmit: {
                type: ['string'],
                enum: ['onChange', 'onBlur', 'onSubmit', 'onTouched'],
              },
            },
          },
        },
      },
      'alfons-element-grid': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-grid',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              rowGap: {
                type: 'number',
              },
              columnGap: {
                type: 'number',
              },
              columnsCountDesktop: {
                type: 'number',
              },
              columnsCountTablet: {
                type: 'number',
              },
              columnsCountMobile: {
                type: 'number',
              },
            },
          },
        },
      },
      'alfons-element-grid-item': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-grid-item',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              spanColumnsCountDesktop: {
                type: 'number',
              },
              spanColumnsCountTablet: {
                type: 'number',
              },
              spanColumnsCountMobile: {
                type: 'number',
              },
            },
          },
        },
      },
      'alfons-element-input': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-input',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              autoComplete: {
                type: ['string'],
                enum: ['on', 'off', 'one-time-code'],
              },
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
              },
              defaultValue: {
                type: 'string',
              },
              disabled: {
                type: 'boolean',
              },
              endAdornment: {
                type: 'string',
              },
              endAdornmentIcon: {
                type: 'string',
              },
              helperText: {
                type: 'string',
              },
              inputMode: {
                type: ['string'],
                enum: ['none', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'],
              },
              label: {
                type: 'string',
              },
              multiline: {
                type: 'boolean',
              },
              placeholder: {
                type: 'string',
              },
              size: {
                type: ['string'],
                enum: ['small', 'medium'],
              },
              startAdornment: {
                type: 'string',
              },
              startAdornmentIcon: {
                type: 'string',
              },
              type: {
                type: ['string'],
                enum: ['color', 'date', 'datetime-local', 'month', 'number', 'password', 'text', 'time', 'week'],
              },
              variant: {
                type: ['string'],
                enum: ['outlined', 'standard', 'filled'],
              },
            },
          },
        },
      },
      'alfons-element-radio-group': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-radio-group',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
              },
              defaultValue: {
                type: 'string',
              },
              direction: {
                type: ['string'],
                enum: ['horizontal', 'vertical'],
              },
              label: {
                type: 'string',
              },
              labelPlacement: {
                type: ['string'],
                enum: ['bottom', 'end', 'start', 'top'],
              },
              optionLabels: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              optionValues: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              size: {
                type: ['string'],
                enum: ['small', 'medium'],
              },
            },
          },
        },
      },
      'alfons-element-row': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-row',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              display: {
                type: ['string'],
                enum: ['flex-row', 'flex-row-reverse', 'grid'],
              },
            },
          },
        },
      },
      'alfons-element-select': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-select',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
              },
              defaultValue: {
                type: 'string',
              },
              helperText: {
                type: 'string',
              },
              label: {
                type: 'string',
              },
              labels: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              native: {
                type: 'boolean',
              },
              placeholder: {
                type: 'string',
              },
              size: {
                type: ['string'],
                enum: ['small', 'medium'],
              },
              values: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      'alfons-element-slider': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-slider',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
              },
              defaultValue: {
                type: 'number',
              },
              disabled: {
                type: 'boolean',
              },
              marks: {
                type: 'boolean',
              },
              max: {
                type: 'number',
              },
              min: {
                type: 'number',
              },
              orientation: {
                type: ['string'],
                enum: ['horizontal', 'vertical'],
              },
              step: {
                type: 'number',
                minimum: 1,
              },
            },
          },
        },
      },
      'alfons-element-stack': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-stack',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              alignment: {
                type: ['string'],
                enum: [
                  'bottom',
                  'bottom-left',
                  'bottom-right',
                  'center',
                  'left',
                  'right',
                  'top',
                  'top-left',
                  'top-right',
                ],
              },
              fullscreen: {
                type: 'boolean',
              },
              orientation: {
                type: ['string'],
                enum: ['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse'],
              },
              stretch: {
                type: 'boolean',
              },
            },
          },
        },
      },
      'alfons-element-switch': {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          type: {
            const: '@finshape/alfons-element-switch',
          },
          name: {
            type: 'string',
          },
          children: {
            type: 'array',
            items: {
              $ref: '#/$defs/elements',
            },
          },
          props: {
            type: 'object',
            properties: {
              fullWidth: {
                type: 'boolean',
              },
              label: {
                type: 'string',
              },
              labelPlacement: {
                type: ['string'],
                enum: ['bottom', 'end', 'start', 'top'],
              },
              color: {
                type: ['string'],
                enum: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'default'],
              },
              size: {
                type: ['string'],
                enum: ['small', 'medium'],
              },
            },
          },
        },
      },
    },
  },
})
