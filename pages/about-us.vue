<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'O nas', slug: 'about-us' }]"> </PageTitle>
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
              <h2 class="text-[22px] font-bold">O nas</h2>
              <div>
                <h3 class="text-[18px] font-bold mt-5">Kim jesteśmy?</h3>
                <p class="mt-5">
                  Olmag.pl to nowoczesny sklep internetowy z głęboką
                  specjalizacją w branży magazynowej. Nasza platforma to efekt
                  połączenia pasji z wiedzą i profesjonalizmem naszego zespołu
                  ekspertów. Nieustannie analizujemy rynek, by oferować Ci tylko
                  te produkty, które spełniają najwyższe standardy jakości i
                  funkcjonalności. Wierzymy, że każdy profesjonalny magazyn
                  powinien charakteryzować się nie tylko efektywnością, ale
                  przede wszystkim bezpieczeństwem oraz ergonomią pracy. Dlatego
                  w Olmag.pl znajdziesz wyposażenie, które sprawi, że Twoje
                  miejsce pracy będzie nie tylko bardziej produktywne, ale i
                  bezpieczne dla wszystkich pracowników. Nasza misja to wsparcie
                  w tworzeniu przestrzeni magazynowych przyszłości –
                  efektywnych, innowacyjnych i przemyślanych w każdym detalu.
                </p>
              </div>
              <h3 class="text-[18px] font-bold mt-5">
                Dlaczego warto wybrać naszą firmę?
              </h3>
              <p class="mt-5">- Czołowa jakość obsługi w naszej dziedzinie.</p>
              <p class="mt-5">- Nasze produkty posiadają konkurencyjne ceny.</p>
              <p class="mt-5">- Szybka realizacja zamówienia oraz wysyłka.</p>
              <p class="mt-5">
                - Wykwalifikowanych specjaliści, którzy pomogą wybrać
                najbardziej odpowiedni produkt dla Państwa.
              </p>
              <p class="mt-5">
                - Liczna oferta polskich produktów, które cechują się
                niesamowitą jakością i wytrzymałością.
              </p>
              <p class="mt-5">
                - Nasza oferta miesięcznie rośnie o nowe produkty zgodne z
                naszym charakterem działalności.
              </p>
              <h3 class="text-[18px] font-bold mt-5">
                W dni robocze możesz na nas liczyć w godzinach od 8:00 do 17:00.
              </h3>
              <p class="mt-5">- Telefon: 698 304 621</p>
              <p class="mt-5">- Mail: sklep@olmag.pl</p>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
