<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :textNav="[
          { text: 'Czas realizacji zamówienia', slug: 'order-processing-time' },
        ]"
      >
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
                <h2 class="text-[22px] font-bold">
                  Czas realizacji zamówienia
                </h2>
                <p class="mt-5">
                  W opisie każdego produktu podana jest
                  <NuxtLink to="/availability-products" class="text-emerald-400"
                    >dostępność</NuxtLink
                  >
                  - przewidywany czas oczekiwania na jego sprowadzenie do
                  magazynu olmag.pl oraz wysłanie do klienta (liczony w dniach
                  roboczych od momentu potwierdzenia zamówienia). W przypadku
                  zamówienia kilku produktów liczy się zawsze najdłuższy czas
                  dostępności. Podczas weryfikacji zamówienia, Klient
                  informowany jest o terminie realizacji zamówienia oraz
                  potwierdzane są koszty transportu.
                </p>
                <p class="mt-5">
                  W przypadku płatności przelewem określony termin realizacji
                  wydłuża się o czas księgowania wpłaty.
                </p>
                <p class="mt-5 text-[16px] font-bold">
                  Data otrzymania przesyłki = termin realizacji (dostępność) +
                  czas dostawy
                </p>
                <p class="mt-5">
                  <strong>Wysyłka kurierska</strong> - W przypadku przesyłek
                  kurierskich każdorazowo w momencie nadania przesyłki
                  informujemy mailowo klienta o jej numerze przewozowym, na
                  podstawie którego może on uzyskać numer telefonu do kuriera.
                  Przesyłki kurierskie dostarczane są do klienta w ciągu 1-2 dni
                  od momentu wydania paczki z naszego magazynu.
                </p>
              </div>
              <div class="mt-10 flex">
                <h2 class="font-bold">Powiązane tematy:</h2>
                <NuxtLink
                  :to="'/availability-products'"
                  class="text-emerald-400 ml-3"
                >
                  Dostępność produktów
                </NuxtLink>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
