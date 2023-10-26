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
          { text: 'Dostępności produktów', slug: 'availability-products' },
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
                <h2 class="text-[22px] font-bold">Dostępności produktów</h2>
                <p class="mt-5">
                  W naszym magazynie gromadzimy produkty, które cieszą się
                  największym zainteresowaniem wśród naszych Klientów. Jeśli
                  produktu aktualnie nie mamy na stanie, szybko zamawiamy go od
                  naszych dostawców. Przy każdym produkcie znajdziesz informację
                  o przewidywanym czasie dostawy do naszego magazynu, liczonym w
                  dniach roboczych od chwili potwierdzenia zamówienia.
                </p>
                <span class="text-[18px] font-bold !mt-5"
                  >Objaśnienie oznaczeń dostępności produktów:</span
                >
                <p>
                  <strong>Dostępny</strong> - Ten produkt wysyłamy w ciągu 24h
                  od chwili potwierdzenia zamówienia (w przypadku przesyłek
                  kurierskich oraz płatności on-line lub za pobraniem)
                </p>
                <p>
                  <strong>24-48h</strong> - Ten produkt zostanie sprowadzony do
                  naszego magazynu centralnego w ciągu 24-48 godzin (w dni
                  robocze) od chwili potwierdzenia zamówienia lub wpłynięcia
                  płatności na nasze konto.
                </p>
                <p>
                  <strong>3-7 dni</strong> - Ten produkt zostanie sprowadzony do
                  naszego magazynu centralnego w ciągu 3-7 dni (w dni robocze)
                  od chwili potwierdzenia zamówienia lub wpłynięcia płatności na
                  nasze konto.
                </p>
                <p>
                  <strong>3-10 dni</strong> - Ten produkt zostanie sprowadzony
                  do naszego magazynu centralnego w ciągu 3-10 dni (w dni
                  robocze) od chwili potwierdzenia zamówienia lub wpłynięcia
                  płatności na nasze konto.
                </p>
                <p>
                  <strong>2 tygodnie</strong> - Ten produkt zostanie sprowadzony
                  do naszego magazynu centralnego w ciągu 14 dni (w dni robocze)
                  od chwili potwierdzenia zamówienia lub wpłynięcia płatności na
                  nasze konto.
                </p>
                <p>
                  <strong>3 tygodnie</strong> - Ten produkt zostanie sprowadzony
                  do naszego magazynu centralnego w ciągu 21 dni (w dni robocze)
                  od chwili potwierdzenia zamówienia lub wpłynięcia płatności na
                  nasze konto.
                </p>
                <p>
                  <strong>3-5 tygodni</strong> - Ten produkt zostanie
                  sprowadzony do naszego magazynu centralnego w ciągu 21-35 dni
                  (w dni robocze) od chwili potwierdzenia zamówienia lub
                  wpłynięcia płatności na nasze konto.
                </p>
                <p>
                  <strong>Potwierdzenie sprzedawcy</strong> - Ograniczona ilość
                  towaru w naszym magazynie. Zamówienie tworzy konsultant po
                  wcześniejszym sprawdzeniu stanów na magazynie. Czas realizacji
                  zależny od dostępności u dostawców. Termin realizacji
                  zamówienia potwierdza Klientowi konsultant w trakcie rozmowy
                  telefonicznej.
                </p>
                <strong>Na zamówienie</strong> - Brak towaru w naszym magazynie.
                Możliwość sprowadzenia na indywidualne zamówienie Klienta. Czas
                realizacji zależny od dostępności u dostawców. Termin realizacji
                zamówienia potwierdza Klientowi konsultant w trakcie rozmowy
                telefonicznej. Do terminu realizacji należy doliczyć czas na
                zaksięgowanie zaliczki, którą zazwyczaj Klient zobowiązany jest
                wpłacić na poczet realizacji indywidualnego zamówienia.
              </div>
              <div>
                <p>
                  W przypadku płatności przelewem określony termin realizacji
                  wydłuża się o czas księgowania wpłaty.
                </p>
                <p class="mt-10 text-[16px] font-bold">
                  Data otrzymania przesyłki = termin realizacji (dostępność) +
                  czas dostawy
                </p>
              </div>
              <div class="mt-10 flex">
                <h2 class="font-bold">Powiązane tematy:</h2>
                <NuxtLink
                  :to="'/order-processing-time'"
                  class="text-emerald-400 ml-3"
                >
                  Czas realizacji zamówienia
                </NuxtLink>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
