import React from 'react'
import {Card, Flex, Text} from '@sanity/ui'
import {set, unset} from 'sanity'
import {iconOptions} from '../lib/iconOptions' // Asegúrate de que esta ruta sea correcta

export default function IconPicker({value, onChange}) {
  return (
    <Flex wrap="wrap" gap={3}>
      {iconOptions.map(({label, value: val, icon: Icon}) => {
        const isSelected = value === val

        return (
          <Card
            key={val}
            padding={3}
            radius={2}
            shadow={isSelected ? 2 : 1}
            tone={isSelected ? 'primary' : 'default'}
            style={{
              cursor: 'pointer',
              minWidth: '100px',
              textAlign: 'center',
              border: isSelected ? '2px solid #0EA5E9' : '1px solid #ccc',
            }}
            onClick={() =>
              typeof onChange === 'function' ? onChange(isSelected ? unset() : set(val)) : null
            }
          >
            <Flex direction="column" align="center" gap={2}>
              <Icon className="h-8 w-8 text-blue-700" />
              <Text size={1}>{label}</Text>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}
