<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Płatności', slug: 'payment' }]">
      </PageTitle>
    </PageHeader>
    <PageBody>
      <div class="flex gap-5 container m-auto my-10">
        <PageSection class="min-w-85 max-w-85">
          <PageHelpNavigation />
        </PageSection>

        <PageSection class="w-full">
          <div
            class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl"
          >
            <div class="p-5 font-600 text-blue-900">
              <h2 class="text-[22px] font-bold">Płatności</h2>
              <div>
                <p class="text-20px my-10">
                  Możesz u nas zapłacić wykorzystując:
                  <ul class="ml-5 mt-2">
                    <li>
                      - Standardowy przelew:
                    </li>
                    <li class="mt-2">
                      - Płatność za pobraniem (+ 8.13 zł netto).
                    </li>
                    <li>
                      - Przelew online za pomocą systemu Przelewy24.
                    </li>
                    <li>
                      - Przelew na podstawie faktury proforma
                    </li>
                    <p class="ml-6">Faktura generowana jest automatycznie po zaznaczeniu „Przelew standardowy” na etapie wybierania sposobu płatności.</p>
                  </ul>
                </p>
                <p>
                  Wybierając płatność standardowym przelewem lub płatność na podstawie faktury proforma prosimy dokonywać płatności na poniższe konto operatora sklepu:
                </p>
                <div class="text-[14px] text-center">
                  <p>„Data Sharp” Dawid Jabłoński</p>
                  <p>Santander Bank Polska S.A., <strong>51 1090 1593 0000 0001 5266 0226</strong></p>
                  <p class="mt-3">W tytule przelewu prosimy podać <strong>numer zamówienia</strong> lub <strong> number faktury proformy</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
