<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Dostawa', slug: 'delivery' }]">
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
                <h2 class="text-[22px] font-bold">Dostawa</h2>
                <p class="mt-5">
                  Aby towar został dostarczony z sklepu internetowego
                  <strong>Olmag.pl</strong>, konieczne jest złożenie zamówienia
                  i wybór metody płatności. Towar wysyłamy wyłącznie w dniach
                  roboczych, od poniedziałku do piątku.
                </p>
                <p class="mt-5">
                  Jeśli zamówienie zostanie złożone do godziny 14.00 i wybrany
                  produkt jest dostępny w magazynie, realizacja nastąpi tego
                  samego dnia w ziąwzku z czym przesyłka zostanie oddana
                  kurierowi w tym samym dniu bądź w następnym dniu roboczym.
                  Następnie firma kurierska dostarcza produkt do państwa w ciągu
                  1-2 dni roboczych. W przypadku braku towaru w magazynie,
                  termin realizacji może ulec opóźnieniu (więcej znajduje się w
                  zakłądce
                  <NuxtLink
                    class="text-emerald-400"
                    :to="'/order-processing-time'"
                    >Czas realizacji zamówienia</NuxtLink
                  >). <br />Aby zamówienie zostało zrealizowane w podanym czasie
                  przy wyborze płatności przelewem, konieczne jest zaksięgowanie
                  odpowiedniej kwoty na koncie firmy Olmag.pl.
                </p>
                <p class="mt-5">
                  Standardowy koszt przesyłki to 20 zł. Jednak przy bardzo
                  ciężkich paczkach może ulec podwyższeniu.
                </p>
                <p class="mt-5">
                  Przesyłki kurierskie są dostarczane od poniedziałku do piątku
                  w godzinach 8.00-16.00. Dlatego zalecamy, by Klienci wybierali
                  adres, przy którym zawsze jest ktoś upoważniony do odbioru.
                  Niestety nie jesteśmy w stanie precyzyjnie określić godziny
                  dostawy - to firma kurierska decyduje o dokładnym terminie
                  doręczenia. Zapewniamy jednak numer listu przewozowego, który
                  pozwala na kontakt z lokalnym oddziałem kurierskim w celu
                  uzyskania bardziej szczegółowych informacji i ustalenia
                  konkretnej godziny z kurierem.
                </p>
                <p class="mt-5">
                  Prosimy o dokładne sprawdzenie stanu przesyłki w momencie jej
                  odbioru, przy pracowniku firmy kurierskiej. W przypadku kiedy
                  opakowanie towaru posiada znaczne uszkodzenia, ślady
                  otwierania itp. należy odmówić odbioru przesyłki i
                  niezwłocznie poinformować o tym sklep. Powyższe czynności
                  regulują przepisy prawne w ustawie z dnia 15 listopada 1984 r.
                  - Prawo przewozowe /Dz. U. z 1995 r., Nr 119, poz. 575 z późń.
                  zm./. Jeżeli opakowanie jest w dobrym stanie, należy podpisać
                  odbiór paczki i razem z pracownikiem firmy kurierskiej
                  sprawdzić zawartość. Wtedy odbiorca zamówionego towaru może
                  ocenić czy produkt nie posiada mechanicznych uszkodzeń oraz
                  czy jest zgodny z fakturą. Towar zamówiony przez Klienta jest
                  przez nas sprawdzony i wysyłany bez uszkodzeń i wad.
                </p>
                <p class="mt-5">
                  Dbamy o to, by zakupiony towar był solidnie zabezpieczony, co
                  pozwala na jego bezpieczny transport i dostarczenie w idealnym
                  stanie. Starannie pakowane przesyłki gwarantują, że produkt
                  dotrze do odbiorcy wolny od uszkodzeń. Gwarantujemy całkowite
                  bezpieczeństwo dostawy Twojego zamówienia.
                </p>
                <p class="mt-5">
                  Jeśli zauważysz jakiekolwiek nieprawidłowości w stanie
                  dostarczonego towaru, niezbędne jest spisanie wraz z kurierem
                  protokołu szkody/uszkodzenia. Druk tego protokołu posiada u
                  siebie kurier. Kluczowe jest, aby dokument został jasno i
                  czytelnie wypełniony, wskazując dokładnie na charakter
                  uszkodzenia przesyłki przez firmę kurierską oraz aby kurier go
                  podpisał. W opisie protokołu konieczne jest wskazanie, że
                  opakowanie zewnętrzne było uszkodzone, nawet jeśli chodzi o
                  drobne wgniecenia, zadrapania czy inne defekty. Jeśli w
                  protokole zaznaczysz, że opakowanie zewnętrzne nie miało
                  żadnych uszkodzeń, prawdopodobnie nie uzyskasz pozytywnej
                  decyzji odnośnie reklamacji w firmie kurierskiej. Mimo
                  posiadania protokołu, precyzyjny opis uszkodzenia jest
                  kluczowy dla procesu reklamacji.
                </p>
                <p class="mt-5">
                  Jeżeli po odejściu kuriera zauważycie Państwo jakiekolwiek
                  uszkodzenie towaru, niezbędne jest natychmiastowe
                  skontaktowanie się z odpowiednią firmą kurierską i wezwanie
                  kuriera z powrotem w celu dokonania spisu protokołu
                  uszkodzenia. Postępowanie takie jest w pełni zgodne z prawem
                  transportowym i kurier nie ma prawa odmówić powrotu.
                  Uszkodzenia mechaniczne produktu czy braki w przesyłce
                  zidentyfikowane po opuszczeniu miejsca przez kuriera
                  traktowane są jako wady powstałe już po dostarczeniu
                  przesyłki.
                </p>
                <p class="mt-5">
                  Jeśli zauważą Państwo błędy w wysyłce, braki lub uszkodzenia
                  przesyłki, prosimy o zgłoszenie reklamacji w ciągu 5 dni
                  roboczych od daty jej dostarczenia. Kluczowy jest czas
                  otrzymania protokołu szkody. Chcemy zaznaczyć, że nasz sklep
                  nie ponosi odpowiedzialności za uszkodzenia lub braki w
                  przesyłce wynikające z działań firmy kurierskiej. Reklamacja
                  bez załączonego protokołu szkody nie będzie rozpatrywana.
                </p>
                <p class="mt-5">
                  Jeśli napotkają Państwo na jakiekolwiek problemy czy sytuacje
                  budzące niepokój, prosimy o niezwłoczne zgłoszenie tego naszej
                  obsłudze sklepu. Gdy zostanie wypełniony protokół, prosimy o
                  jego pilne przesłanie do nas.
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
