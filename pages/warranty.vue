<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Gwarancja', slug: 'warranty' }]">
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
              <div>
                <h2 class="text-[22px] font-bold">Gwarancja</h2>
                <p class="mt-5">
                  Nasze produkty wyróżniają się najwyższą jakością, co
                  potwierdzane jest gwarancją od producenta. W każdym momencie,
                  jeśli masz jakiekolwiek pytania czy wątpliwości dotyczące
                  oferowanych przez nas produktów, jesteśmy gotowi dostarczyć Ci
                  dokładnych i wyczerpujących informacji.
                </p>
                <p class="mt-3">
                  Dla nas priorytetem jest zadowolenie Klienta. Gwarantujemy, że
                  zakupy dokonane w naszym sklepie zostaną zrealizowane w
                  całości i z najwyższą starannością. Wprowadziliśmy mechanizm
                  śledzenia przesyłek, co zwiększa pewność i komfort zakupów u
                  nas.
                </p>
                <p class="mt-3">
                  W sytuacji, gdyby przesyłka została uszkodzona przez firmę
                  kurierską, odpowiedzialność oraz wszelkie koszty wynikające z
                  tego tytułu ponosi przewoźnik. W takim przypadku Klient
                  otrzyma od nas nowy, nienaruszony produkt. Jeśli zauważysz
                  uszkodzenie przesyłki, zalecamy nie przyjmować jej. Odmowa
                  odbioru jest kluczowa dla procesu reklamacyjnego z firmą
                  kurierską. Mimo że takie sytuacje są u nas sporadyczne, chcemy
                  zapewnić naszym Klientom poczucie bezpieczeństwa i pewności,
                  że ich interesy są chronione.
                </p>
                <p class="mt-3">
                  Współpracujemy z zaufanymi partnerami logistycznymi i ciągle
                  doskonalimy nasze procedury, aby każdy zakup był dla Ciebie
                  przyjemnością i satysfakcją. Dążymy do tego, byś zawsze czuł
                  się u nas dobrze obsłużony i doceniony.
                </p>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
