import React from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';

export default function ParentsScreen({
  childName,
  childAge,
  readingTimeToday,
  settings,
  onUpdateChildName,
  onUpdateChildAge,
  onUpdateSettings,
}) {
  const updateSetting = (key, value) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <Box className="flex-1 bg-[#fff5f7]">
      <ScrollView>
        <Box className="p-6 pt-8">
          <Heading size="2xl" className="text-typography-900 mb-2">
            Cantinho dos Pais 👨‍👩‍👧
          </Heading>
          <Text size="lg" className="text-typography-600 mb-6">
            Personalize a experiência
          </Text>

          <VStack space="lg">
            <Box
              className="bg-white rounded-3xl p-5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <VStack space="md">
                <Text size="sm" className="text-typography-700 font-semibold">
                  Informações da Criança
                </Text>
                <VStack space="sm">
                  <Text size="xs" className="text-typography-600">
                    Nome
                  </Text>
                  <Input variant="outline" className="rounded-2xl">
                    <InputField
                      value={childName}
                      onChangeText={onUpdateChildName}
                      placeholder="Nome da criança"
                    />
                  </Input>
                </VStack>
                <VStack space="sm">
                  <Text size="xs" className="text-typography-600">
                    Idade
                  </Text>
                  <Input variant="outline" className="rounded-2xl">
                    <InputField
                      value={childAge}
                      onChangeText={onUpdateChildAge}
                      placeholder="Idade"
                      keyboardType="numeric"
                    />
                  </Input>
                </VStack>
              </VStack>
            </Box>

            <Box
              className="bg-white rounded-3xl p-5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <VStack space="md">
                <Text size="sm" className="text-typography-700 font-semibold">
                  Tempo de Leitura Hoje
                </Text>
                <HStack className="items-center justify-center py-4">
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#ff6b9d',
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text size="2xl" className="text-white font-bold">
                      {readingTimeToday}
                    </Text>
                    <Text size="xs" className="text-white">
                      minutos
                    </Text>
                  </View>
                </HStack>
              </VStack>
            </Box>

            <Box
              className="bg-white rounded-3xl p-5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <VStack space="md">
                <Text size="sm" className="text-typography-700 font-semibold mb-2">
                  Ajustes
                </Text>

                <HStack className="items-center justify-between py-2">
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="text-typography-900">
                      Tamanho da Fonte
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      Ajustar tamanho do texto
                    </Text>
                  </VStack>
                  <Text size="sm" className="text-[#ff6b9d] font-semibold">
                    {settings.fontSize === 'small'
                      ? 'Pequeno'
                      : settings.fontSize === 'medium'
                      ? 'Médio'
                      : 'Grande'}
                  </Text>
                </HStack>

                <HStack className="items-center justify-between py-2">
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="text-typography-900">
                      Modo Noturno
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      Tema escuro para leitura noturna
                    </Text>
                  </VStack>
                  <Switch
                    value={settings.nightMode}
                    onValueChange={(value) => updateSetting('nightMode', value)}
                    trackColor={{ false: '#d1d5db', true: '#ffa94d' }}
                    thumbColor={settings.nightMode ? '#ff6b9d' : '#f3f4f6'}
                  />
                </HStack>

                <HStack className="items-center justify-between py-2">
                  <VStack space="xs" className="flex-1">
                    <Text size="sm" className="text-typography-900">
                      Sons
                    </Text>
                    <Text size="xs" className="text-typography-500">
                      Efeitos sonoros durante a leitura
                    </Text>
                  </VStack>
                  <Switch
                    value={settings.sounds}
                    onValueChange={(value) => updateSetting('sounds', value)}
                    trackColor={{ false: '#d1d5db', true: '#ffa94d' }}
                    thumbColor={settings.sounds ? '#ff6b9d' : '#f3f4f6'}
                  />
                </HStack>
              </VStack>
            </Box>

            <Box
              className="bg-white rounded-3xl p-5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <VStack space="sm">
                <Text size="sm" className="text-typography-700 font-semibold">
                  Segurança
                </Text>
                <Text size="xs" className="text-typography-600 leading-5">
                  Este aplicativo foi projetado para ser 100% seguro. Todo o conteúdo é offline e não há links externos, anúncios ou compras.
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
