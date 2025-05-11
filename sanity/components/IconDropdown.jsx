import React, {useState} from 'react'
import {Box, Button, Card, Dialog, Flex, Stack, Text, TextInput} from '@sanity/ui'
import {set, unset} from 'sanity'
import {iconOptions} from '../lib/iconOptions' // Asegurate que esta ruta sea correcta

export default function IconDropdown({value, onChange}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = iconOptions.find((opt) => opt.value === value)
  const filteredOptions = iconOptions.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  )

  const handleSelect = (val) => {
    setOpen(false)
    if (val === '__clear__') {
      onChange(unset())
    } else {
      onChange(set(val))
    }
  }

  return (
    <Box>
      <Button
        text={selected ? selected.label : 'Seleccioná un ícono'}
        icon={selected?.icon ? () => <selected.icon style={{width: 24, height: 24}} /> : undefined}
        tone="primary"
        onClick={() => setOpen(true)}
      />

      {open && (
        <Dialog
          header="Seleccioná un ícono"
          id="icon-select-dialog"
          width={1}
          onClose={() => setOpen(false)}
        >
          <Box padding={4}>
            <Stack space={4}>
              <TextInput
                placeholder="Buscar ícono..."
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <Box style={{maxHeight: '60vh', overflowY: 'auto'}}>
                <Flex wrap="wrap" gap={4}>
                  {filteredOptions.map(({label, value: val, icon: Icon}) => (
                    <Card
                      key={val}
                      padding={3}
                      radius={2}
                      shadow={1}
                      tone={value === val ? 'primary' : 'default'}
                      style={{
                        cursor: 'pointer',
                        width: 100,
                        textAlign: 'center',
                        border: value === val ? '2px solid #0EA5E9' : '1px solid #e5e7eb',
                      }}
                      onClick={() => handleSelect(val)}
                    >
                      <Flex direction="column" align="center" gap={2}>
                        <Icon className="h-8 w-8 text-blue-700" />
                        <Text size={1}>{label}</Text>
                      </Flex>
                    </Card>
                  ))}

                  <Card
                    padding={3}
                    radius={2}
                    shadow={1}
                    tone="critical"
                    style={{
                      cursor: 'pointer',
                      width: 100,
                      textAlign: 'center',
                      border: '1px dashed #f87171',
                    }}
                    onClick={() => handleSelect('__clear__')}
                  >
                    <Flex direction="column" align="center" gap={2}>
                      <Text size={2}>✖</Text>
                      <Text size={1}>Quitar ícono</Text>
                    </Flex>
                  </Card>
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}
