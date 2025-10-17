export default function Home() {
  return (
    <div className="w-full">
      <section className="inline-flex flex-col items-center self-stretch justify-start gap-4">
        <div className="flex flex-col items-center justify-start w-full max-w-3xl">
          <div className="self-stretch text-center justify-center text-primary text-6xl font-extrabold  leading-[60px]">
            Wiesz, co jesz.
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full max-w-3xl">
          <div className="self-stretch justify-center text-center">
            <span className="text-lg font-normal leading-7 text-secondary">
              Uzyskaj{" "}
            </span>
            <span className="text-lg font-medium leading-7 text-secondary">
              szczegółową analizę AI
            </span>
            <span className="text-lg font-normal leading-7 text-secondary">
              {" "}
              o składnikach swojego jedzenia lub karmy dla pupila. Podejmuj
              świadome decyzje dla zdrowszego życia.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center self-stretch justify-start gap-4">
          <div className="p-1 bg-orange/20 rounded-full shadow-[0px_0px_12px_0px_rgba(249,192,154,0.10)] inline-flex justify-start items-start gap-[0px]">
            <div
              data-variant="2"
              className="px-6 py-2 bg-white rounded-full shadow-[0px_0px_12px_0px_rgba(249,192,154,0.10)] inline-flex flex-col justify-center items-center"
            >
              <div className="justify-center text-sm font-semibold leading-tight text-center text-primary">
                Żywność dla ludzi
              </div>
            </div>
            <div
              data-variant="3"
              className="inline-flex flex-col items-center justify-center px-6 py-2 rounded-full"
            >
              <div className="justify-center text-sm font-semibold leading-tight text-center text-secondary">
                Karma dla zwierząt
              </div>
            </div>
          </div>
          <div className="w-full max-w-[700px] relative flex flex-col justify-start items-start">
            <div className="self-stretch h-16 pl-6 pr-40 py-5 bg-white rounded-[36px] shadow-[0px_0px_12px_0px_rgba(249,192,154,0.10)] inline-flex justify-center items-start overflow-hidden">
              <div className="w-[488px] inline-flex flex-col justify-start items-start overflow-hidden">
                <div className="justify-center text-base font-normal text-secondary ">
                  Wklej tutaj składniki…
                </div>
              </div>
            </div>
            <div
              data-variant="1"
              className="h-12 px-6 py-3.5 left-[525.52px] top-[8px] absolute bg-orange rounded-[32px] inline-flex justify-center items-center"
            >
              <div className="justify-center text-sm font-bold leading-tight text-center text-white">
                Analizuj składniki
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch justify-start pt-4">
            <div className="inline-flex items-center self-stretch justify-between">
              <div className="flex items-center justify-start h-16 gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange/20">
                  <div data-variant="1" className="relative w-6 h-6">
                    <div className="w-4 h-5 left-[3px] top-[3.75px] absolute bg-orange" />
                  </div>
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="flex flex-col items-start self-stretch justify-start">
                    <div className="justify-center text-base font-bold leading-normal text-primary">
                      Niezawodne i szybkie
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch justify-center text-sm font-normal leading-tight text-secondary">
                      Dokładne wyniki w zaledwie kilka minut.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start h-16 gap-4 pr-14">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange/20">
                  <div data-variant="2" className="relative w-6 h-6">
                    <div className="w-5 h-5 left-[2.25px] top-[2.25px] absolute bg-orange" />
                  </div>
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="flex flex-col items-start self-stretch justify-start">
                    <div className="justify-center text-base font-bold leading-normal text-primary">
                      Oszczędza Twój czas
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch justify-center text-sm font-normal leading-tight text-secondary">
                      Wszystkie informacje w jednym miejscu.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start h-16 gap-4 pr-9">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange/20">
                  <div data-variant="3" className="relative w-6 h-6">
                    <div className="w-6 h-4 left-[0.75px] top-[4.50px] absolute bg-orange" />
                  </div>
                </div>
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="flex flex-col items-start self-stretch justify-start">
                    <div className="justify-center text-base font-bold leading-normal text-primary">
                      Dla ludzi i zwierząt
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <div className="self-stretch justify-center text-sm font-normal leading-tight text-secondary">
                      Pełna analiza bez ograniczeń.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
