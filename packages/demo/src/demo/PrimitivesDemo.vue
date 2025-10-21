<script setup lang="ts">
import { ref, computed } from 'vue'
import { HtButton, HtInput, HtCheckbox, HtRadio } from '@happy-table/core'

// Button demo state
const isLoading = ref(false)
const buttonClickCount = ref(0)

const handleButtonClick = () => {
  buttonClickCount.value++
}

const handleAsyncAction = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}

// Input demo state
const textInput = ref('')
const emailInput = ref('')
const searchInput = ref('')
const numberInput = ref(100)
const passwordInput = ref('')

const emailError = computed(() => {
  if (!emailInput.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(emailInput.value) ? '' : 'Invalid email format'
})

const emailState = computed(() => {
  if (!emailInput.value) return 'default'
  return emailError.value ? 'error' : 'success'
})

// Checkbox demo state
const singleCheckbox = ref(false)
const longTextCheckbox = ref(false)
const termsCheckbox = ref(false)
const checkboxItems = ref([
  { id: 1, label: 'Item 1', checked: false },
  { id: 2, label: 'Item 2', checked: false },
  { id: 3, label: 'Item 3', checked: false },
  { id: 4, label: 'Item 4', checked: false },
])

const allChecked = computed(() => checkboxItems.value.every(item => item.checked))
const someChecked = computed(() => checkboxItems.value.some(item => item.checked) && !allChecked.value)

const toggleAll = () => {
  const nextState = !allChecked.value
  // Use map to create new array reference for better reactivity control
  checkboxItems.value = checkboxItems.value.map(item => ({
    ...item,
    checked: nextState,
  }))
}

// Radio demo state
const selectedColor = ref('blue')
const selectedSize = ref('md')
const selectedPlan = ref('pro')
const selectedPayment = ref('card')
const selectedNotification = ref('email')

// Form demo state
const formData = ref({
  username: '',
  email: '',
  password: '',
  agreeTerms: false,
})

const formSubmitted = ref(false)

const handleFormSubmit = () => {
  formSubmitted.value = true
  console.log('Form submitted:', formData.value)
  setTimeout(() => {
    formSubmitted.value = false
  }, 3000)
}

const handleFormReset = () => {
  formData.value = {
    username: '',
    email: '',
    password: '',
    agreeTerms: false,
  }
}
</script>

<template>
  <div class="space-y-12">
    <!-- HtButton Demo -->
    <section class="rounded-lg border border-[var(--ht-border)] p-6">
      <h2 class="mb-6 text-xl font-semibold text-[var(--ht-text)]">HtButton - 按钮组件</h2>

      <!-- Variants -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Variants (变体)</h3>
        <div class="flex flex-wrap items-center gap-3">
          <HtButton label="Default" variant="default" @click="handleButtonClick" />
          <HtButton label="Primary" variant="primary" @click="handleButtonClick" />
          <HtButton label="Secondary" variant="secondary" @click="handleButtonClick" />
          <HtButton label="Outline" variant="outline" @click="handleButtonClick" />
          <HtButton label="Ghost" variant="ghost" @click="handleButtonClick" />
          <HtButton label="Destructive" variant="destructive" @click="handleButtonClick" />
          <HtButton label="Link" variant="link" @click="handleButtonClick" />
          <HtButton label="Filled" variant="filled" @click="handleButtonClick" />
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Button clicked:
          <strong>{{ buttonClickCount }}</strong>
          times
        </p>
      </div>

      <!-- Sizes -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Sizes (尺寸)</h3>
        <div class="flex flex-wrap items-center gap-3">
          <HtButton label="Micro" size="micro" variant="primary" />
          <HtButton label="Extra Small" size="xs" />
          <HtButton label="Small" size="sm" />
          <HtButton label="Medium" size="md" />
          <HtButton label="Large" size="lg" />
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Size progression: Micro (24px) → XS (28px) → SM (32px) → MD (36px) → LG (44px)
        </p>
      </div>

      <!-- Icon Sizes -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Icon Sizes (图标尺寸)</h3>
        <div class="flex flex-wrap items-center gap-3">
          <HtButton size="icon-micro" variant="outline">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </HtButton>
          <HtButton size="icon-xs" variant="outline">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </HtButton>
          <HtButton size="icon-sm" variant="outline">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </HtButton>
          <HtButton size="icon" variant="outline">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </HtButton>
          <HtButton size="icon-lg" variant="outline">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
          </HtButton>
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Icon button sizes: icon-micro (24px) → icon-xs (28px) → icon-sm (32px) → icon (36px) → icon-lg (44px)
        </p>
      </div>

      <!-- States -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">States (状态)</h3>
        <div class="flex flex-wrap items-center gap-3">
          <HtButton label="Normal" variant="primary" />
          <HtButton label="Disabled" variant="primary" disabled />
          <HtButton label="Loading" variant="primary" :loading="isLoading" @click="handleAsyncAction" />
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">Click "Loading" button to see 2-second async action</p>
      </div>

      <!-- Block Mode -->
      <div>
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Block Mode (全宽模式)</h3>
        <HtButton label="Full Width Button" variant="primary" block />
      </div>
    </section>

    <!-- HtInput Demo -->
    <section class="rounded-lg border border-[var(--ht-border)] p-6">
      <h2 class="mb-6 text-xl font-semibold text-[var(--ht-text)]">HtInput - 输入框组件</h2>

      <!-- Basic Input -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Basic Input (基础输入)</h3>
        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Text Input</label>
            <HtInput v-model="textInput" placeholder="Enter some text..." />
            <p class="mt-1 text-xs text-[var(--ht-text-subtle)]">Value: {{ textInput || '(empty)' }}</p>
          </div>
        </div>
      </div>

      <!-- Variants -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Variants (变体)</h3>
        <div class="space-y-3">
          <HtInput v-model="textInput" placeholder="Default variant" variant="default" />
          <HtInput v-model="textInput" placeholder="Filled variant" variant="filled" />
          <HtInput v-model="textInput" placeholder="Outline variant" variant="outline" />
          <HtInput v-model="textInput" placeholder="Ghost variant" variant="ghost" />
        </div>
      </div>

      <!-- Sizes -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Sizes (尺寸)</h3>
        <div class="space-y-3">
          <HtInput v-model="textInput" placeholder="Small size" size="sm" />
          <HtInput v-model="textInput" placeholder="Medium size" size="md" />
          <HtInput v-model="textInput" placeholder="Large size" size="lg" />
        </div>
      </div>

      <!-- Validation States -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Validation States (验证状态)</h3>
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Email (with validation)</label>
            <HtInput
              v-model="emailInput"
              type="email"
              placeholder="Enter email address"
              :state="emailState"
              clearable
            />
            <p v-if="emailError" class="mt-1 text-xs text-[var(--ht-danger)]">
              {{ emailError }}
            </p>
            <p v-else-if="emailInput" class="mt-1 text-xs text-[var(--ht-success)]">Valid email format</p>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Error State</label>
            <HtInput model-value="invalid-value" placeholder="Error example" state="error" />
            <p class="mt-1 text-xs text-[var(--ht-danger)]">This field has an error</p>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Success State</label>
            <HtInput model-value="valid-value" placeholder="Success example" state="success" />
            <p class="mt-1 text-xs text-[var(--ht-success)]">This field is valid</p>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Warning State</label>
            <HtInput model-value="warning-value" placeholder="Warning example" state="warning" />
            <p class="mt-1 text-xs text-[var(--ht-warning)]">This field has a warning</p>
          </div>
        </div>
      </div>

      <!-- Clearable -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Clearable (可清空)</h3>
        <HtInput v-model="searchInput" type="search" placeholder="Search... (ESC to clear)" clearable />
        <p class="mt-1 text-xs text-[var(--ht-text-subtle)]">Search query: {{ searchInput || '(empty)' }}</p>
      </div>

      <!-- Prefix/Suffix Slots -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Prefix/Suffix Slots (前缀/后缀插槽)</h3>
        <div class="space-y-3">
          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Search with Icon</label>
            <HtInput v-model="searchInput" placeholder="Search..." clearable>
              <template #prefix>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
            </HtInput>
          </div>

          <div>
            <label class="mb-1 block text-xs text-[var(--ht-text-muted)]">Number with Unit</label>
            <HtInput v-model="numberInput" type="number" placeholder="Width">
              <template #suffix>
                <span class="text-xs">px</span>
              </template>
            </HtInput>
          </div>
        </div>
      </div>

      <!-- Input Types -->
      <div>
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Input Types (输入类型)</h3>
        <div class="space-y-3">
          <HtInput v-model="passwordInput" type="password" placeholder="Password" />
          <HtInput v-model="numberInput" type="number" placeholder="Number" />
          <HtInput model-value="https://example.com" type="url" placeholder="URL" />
          <HtInput model-value="123-456-7890" type="tel" placeholder="Phone" />
        </div>
      </div>
    </section>

    <!-- HtCheckbox Demo -->
    <section class="rounded-lg border border-[var(--ht-border)] p-6">
      <h2 class="mb-6 text-xl font-semibold text-[var(--ht-text)]">HtCheckbox - 复选框组件</h2>

      <!-- Basic Checkbox -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Basic Checkbox (基础复选框)</h3>
        <HtCheckbox v-model="singleCheckbox" label="I agree to the terms and conditions" />
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Checkbox state:
          <strong>{{ singleCheckbox ? 'Checked' : 'Unchecked' }}</strong>
        </p>
      </div>

      <!-- Sizes -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Sizes (尺寸)</h3>
        <div class="space-y-2">
          <HtCheckbox v-model="singleCheckbox" label="Small size" size="sm" />
          <HtCheckbox v-model="singleCheckbox" label="Medium size" size="md" />
          <HtCheckbox v-model="singleCheckbox" label="Large size" size="lg" />
        </div>
      </div>

      <!-- Indeterminate State -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Indeterminate State (半选状态)</h3>
        <div class="space-y-3">
          <HtCheckbox
            :model-value="allChecked"
            :indeterminate="someChecked"
            label="Select All"
            @update:model-value="toggleAll"
          />
          <div class="ml-6 space-y-3">
            <div v-for="item in checkboxItems" :key="`checkbox-${item.id}`" class="min-h-[24px]">
              <HtCheckbox v-model="item.checked" :label="item.label" />
            </div>
          </div>
        </div>
        <p class="mt-3 text-xs text-[var(--ht-text-muted)]">
          Selected:
          <strong>{{ checkboxItems.filter(i => i.checked).length }}</strong>
          / {{ checkboxItems.length }}
        </p>
      </div>

      <!-- Disabled State -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Disabled State (禁用状态)</h3>
        <div class="space-y-2">
          <HtCheckbox :model-value="false" label="Disabled unchecked" disabled />
          <HtCheckbox :model-value="true" label="Disabled checked" disabled />
        </div>
      </div>

      <!-- Without Label -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Without Label (无标签)</h3>
        <HtCheckbox v-model="singleCheckbox" />
      </div>

      <!-- Long Text Alignment -->
      <div>
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Long Text Alignment (长文本对齐)</h3>
        <div class="space-y-4 max-w-xl">
          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Small Size (-3px offset, 向上偏移)</p>
            <HtCheckbox v-model="longTextCheckbox" size="sm">
              <template #default>
                By checking this box, you agree to receive marketing communications from our company. You can
                unsubscribe at any time by clicking the link in our emails.
              </template>
              <template #description>
                Stay updated with our latest news, product releases, and exclusive offers. We send newsletters once a
                week and you can opt out at any time.
              </template>
            </HtCheckbox>
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Medium Size (2px offset, 向下偏移)</p>
            <HtCheckbox v-model="longTextCheckbox">
              <template #default>
                By checking this box, you agree to receive marketing communications from our company. You can
                unsubscribe at any time by clicking the link in our emails.
              </template>
            </HtCheckbox>
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Large Size (3px offset, 向下偏移)</p>
            <HtCheckbox v-model="longTextCheckbox" size="lg">
              <template #default>
                By checking this box, you agree to receive marketing communications from our company. You can
                unsubscribe at any time by clicking the link in our emails.
              </template>
            </HtCheckbox>
          </div>

          <hr class="border-[var(--ht-border)]" />

          <HtCheckbox v-model="termsCheckbox">
            <template #default>
              I have read and agree to the Terms of Service and Privacy Policy. I understand that my personal
              information will be processed in accordance with applicable data protection laws.
            </template>
          </HtCheckbox>

          <HtCheckbox v-model="singleCheckbox">
            <template #default>
              <span class="font-medium">Newsletter Subscription</span>
            </template>
            <template #description>
              Stay updated with our latest news, product releases, and exclusive offers. We send newsletters once a week
              and you can opt out at any time.
            </template>
          </HtCheckbox>

          <HtCheckbox v-model="singleCheckbox" size="lg">
            <template #default>
              <span class="font-semibold">Enable Advanced Features</span>
            </template>
            <template #description>
              Unlock premium features including advanced analytics, custom reporting, API access, and priority support.
              This requires a Pro subscription plan.
            </template>
          </HtCheckbox>
        </div>
      </div>
    </section>

    <!-- HtRadio Demo -->
    <section class="rounded-lg border border-[var(--ht-border)] p-6">
      <h2 class="mb-6 text-xl font-semibold text-[var(--ht-text)]">HtRadio - 单选框组件</h2>

      <!-- Basic Radio -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Basic Radio (基础单选)</h3>
        <div class="space-y-2">
          <HtRadio v-model="selectedColor" value="red" name="color" label="Red" />
          <HtRadio v-model="selectedColor" value="blue" name="color" label="Blue" />
          <HtRadio v-model="selectedColor" value="green" name="color" label="Green" />
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Selected color:
          <strong>{{ selectedColor }}</strong>
        </p>
      </div>

      <!-- Sizes -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Sizes (尺寸)</h3>
        <div class="space-y-2">
          <HtRadio v-model="selectedSize" value="sm" name="size-demo" label="Small size" size="sm" />
          <HtRadio v-model="selectedSize" value="md" name="size-demo" label="Medium size" size="md" />
          <HtRadio v-model="selectedSize" value="lg" name="size-demo" label="Large size" size="lg" />
        </div>
        <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
          Selected size:
          <strong>{{ selectedSize }}</strong>
        </p>
      </div>

      <!-- Variants -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Variants (变体)</h3>
        <div class="space-y-3">
          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Default Variant</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedColor" value="red" name="variant-default" label="Red" variant="default" />
              <HtRadio v-model="selectedColor" value="blue" name="variant-default" label="Blue" variant="default" />
            </div>
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Filled Variant</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedColor" value="red" name="variant-filled" label="Red" variant="filled" />
              <HtRadio v-model="selectedColor" value="blue" name="variant-filled" label="Blue" variant="filled" />
            </div>
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Outline Variant</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedColor" value="red" name="variant-outline" label="Red" variant="outline" />
              <HtRadio v-model="selectedColor" value="blue" name="variant-outline" label="Blue" variant="outline" />
            </div>
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Ghost Variant</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedColor" value="red" name="variant-ghost" label="Red" variant="ghost" />
              <HtRadio v-model="selectedColor" value="blue" name="variant-ghost" label="Blue" variant="ghost" />
            </div>
          </div>
        </div>
      </div>

      <!-- Validation States -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Validation States (验证状态)</h3>
        <div class="space-y-3">
          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Default State</p>
            <HtRadio v-model="selectedColor" value="default" name="state-default" label="Default state" state="default" />
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Error State</p>
            <HtRadio v-model="selectedColor" value="error" name="state-error" label="Error state" state="error" />
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Success State</p>
            <HtRadio v-model="selectedColor" value="success" name="state-success" label="Success state" state="success" />
          </div>

          <div>
            <p class="mb-2 text-xs text-[var(--ht-text-muted)]">Warning State</p>
            <HtRadio v-model="selectedColor" value="warning" name="state-warning" label="Warning state" state="warning" />
          </div>
        </div>
      </div>

      <!-- Disabled State -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Disabled State (禁用状态)</h3>
        <div class="space-y-2">
          <HtRadio :model-value="false" value="disabled-unchecked" name="disabled" label="Disabled unchecked" disabled />
          <HtRadio :model-value="true" value="disabled-checked" name="disabled" label="Disabled checked" disabled />
        </div>
      </div>

      <!-- With Description -->
      <div class="mb-8">
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">With Description (带描述)</h3>
        <div class="space-y-3">
          <HtRadio v-model="selectedPlan" value="free" name="plan">
            <template #default>
              <span class="font-medium">Free Plan</span>
            </template>
            <template #description>Perfect for personal projects and trying out the platform.</template>
          </HtRadio>

          <HtRadio v-model="selectedPlan" value="pro" name="plan">
            <template #default>
              <span class="font-medium">Pro Plan</span>
            </template>
            <template #description>Best for professionals and small teams. Includes advanced features and priority support.</template>
          </HtRadio>

          <HtRadio v-model="selectedPlan" value="enterprise" name="plan">
            <template #default>
              <span class="font-medium">Enterprise Plan</span>
            </template>
            <template #description>
              For large organizations requiring custom solutions, dedicated support, and SLA guarantees.
            </template>
          </HtRadio>
        </div>
        <p class="mt-3 text-xs text-[var(--ht-text-muted)]">
          Selected plan:
          <strong>{{ selectedPlan }}</strong>
        </p>
      </div>

      <!-- Real-world Examples -->
      <div>
        <h3 class="mb-3 text-sm font-medium text-[var(--ht-text)]">Real-world Examples (实际应用示例)</h3>
        <div class="space-y-6 max-w-xl">
          <div>
            <p class="mb-3 text-sm font-medium text-[var(--ht-text)]">Payment Method</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedPayment" value="card" name="payment">
                <template #default>
                  <span class="font-medium">Credit/Debit Card</span>
                </template>
                <template #description>Pay with Visa, Mastercard, or American Express</template>
              </HtRadio>

              <HtRadio v-model="selectedPayment" value="paypal" name="payment">
                <template #default>
                  <span class="font-medium">PayPal</span>
                </template>
                <template #description>Secure payment via PayPal account</template>
              </HtRadio>

              <HtRadio v-model="selectedPayment" value="bank" name="payment">
                <template #default>
                  <span class="font-medium">Bank Transfer</span>
                </template>
                <template #description>Processing may take 2-3 business days</template>
              </HtRadio>
            </div>
            <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
              Selected:
              <strong>{{ selectedPayment }}</strong>
            </p>
          </div>

          <hr class="border-[var(--ht-border)]" />

          <div>
            <p class="mb-3 text-sm font-medium text-[var(--ht-text)]">Notification Preferences</p>
            <div class="space-y-2">
              <HtRadio v-model="selectedNotification" value="email" name="notification" size="lg">
                <template #default>
                  <span class="font-medium">Email Only</span>
                </template>
                <template #description>Receive notifications via email</template>
              </HtRadio>

              <HtRadio v-model="selectedNotification" value="sms" name="notification" size="lg">
                <template #default>
                  <span class="font-medium">SMS Only</span>
                </template>
                <template #description>Receive notifications via text message</template>
              </HtRadio>

              <HtRadio v-model="selectedNotification" value="both" name="notification" size="lg">
                <template #default>
                  <span class="font-medium">Email & SMS</span>
                </template>
                <template #description>Receive notifications through both channels</template>
              </HtRadio>

              <HtRadio v-model="selectedNotification" value="none" name="notification" size="lg">
                <template #default>
                  <span class="font-medium">No Notifications</span>
                </template>
                <template #description>Opt out of all notifications</template>
              </HtRadio>
            </div>
            <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
              Selected:
              <strong>{{ selectedNotification }}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Integration Demo -->
    <section class="rounded-lg border border-[var(--ht-border)] p-6">
      <h2 class="mb-6 text-xl font-semibold text-[var(--ht-text)]">Form Integration (表单集成示例)</h2>

      <form class="space-y-4" @submit.prevent="handleFormSubmit">
        <div>
          <label for="form-username" class="mb-1 block text-sm font-medium text-[var(--ht-text)]">Username</label>
          <HtInput id="form-username" v-model="formData.username" placeholder="Enter username" required />
        </div>

        <div>
          <label for="form-email" class="mb-1 block text-sm font-medium text-[var(--ht-text)]">Email</label>
          <HtInput id="form-email" v-model="formData.email" type="email" placeholder="Enter email" clearable required />
        </div>

        <div>
          <label for="form-password" class="mb-1 block text-sm font-medium text-[var(--ht-text)]">Password</label>
          <HtInput
            id="form-password"
            v-model="formData.password"
            type="password"
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <HtCheckbox v-model="formData.agreeTerms" label="I agree to the terms and conditions" required />
        </div>

        <div class="flex gap-3 pt-2">
          <HtButton type="submit" label="Submit" variant="primary" :disabled="!formData.agreeTerms" />
          <HtButton type="button" label="Reset" variant="outline" @click="handleFormReset" />
        </div>

        <div v-if="formSubmitted" class="rounded bg-[var(--ht-success-bg)] p-3 text-sm text-[var(--ht-text)]">
          Form submitted successfully! Check console for data.
        </div>
      </form>
    </section>
  </div>
</template>

<style scoped>
/* Additional utility classes if needed */
</style>
