import * as React from 'react';
import { useRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

export interface Props {}

type Inputs = {
  name: string;
  price_currency_type: string;
  price_range: string;
};

const NewProductPage: FunctionComponent<Props> = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const defaultInput = {
    is_physical: false,
    is_recurring_billing: false,
    name: '',
    native_type: 'digital',
    price_currency_type: 'cad',
    price_range: '111',
    release_at_date: 'April 16, 2024',
    release_at_time: '12PM',
    subscription_duration: null,
  };

  const shortValue = (a) => a;

  const o = {
    usd: '$',
    gbp: '£',
    eur: '€',
    jpy: '¥',
    inr: '₹',
    aud: 'A$',
    cad: 'CAD$',
    hkd: 'HK$',
    sgd: 'SGD$',
    twd: 'NT$',
    nzd: 'NZ$',
    brl: 'R$',
    zar: 'ZAR',
    chf: 'CHF',
    ils: '₪',
    php: '₱',
    krw: '₩',
    pln: 'zł',
    czk: 'Kč',
  };

  const o2 = {
    usd: {short:'$', long: '(US Dollars)'},
    gbp: {short:'£', long: '(GBP)'},
    eur: {short:'€', long: '(Euro)'},
    jpy: {short:'¥', long: '(Yen)'},
    inr: {short:'₹', long: '(Rupees)'},
    aud: {short:'A$', long: '(Australian Dollars)'},
    cad: {short:'CAD$', long: '(Canadian Dollars)'},
    hkd: {short:'HK$', long: '(Hong Kong Dollars)'},
    sgd: {short:'SGD$', long: '(Singapore Dollars)'},
    twd: {short:'NT$', long: '(Taiwanese Dollars)'},
    nzd: {short:'NZ$', long: '(New Zealand Dollars)'},
    brl: {short:'R$', long: '(Brazilian Real)'},
    zar: {short:'ZAR', long: '(South African Rand)'},
    chf: {short:'CHF', long: '(Swiss Franc)'},
    ils: {short:'₪', long: '(Israeli Shekel)'},
    php: {short:'₱', long: '(Philippine Peso)'},
    krw: {short:'₩', long: '(Korean Won)'},
    pln: {short:'zł', long: '(Polish zloty)'},
    czk: {short:'Kč', long: '(Czech koruna)'},
  };

  function currencyPillText() {
    // return getValues('price_currency_type') || defaultInput.price_currency_type
    const t = watch('price_currency_type') || defaultInput.price_currency_type;
    console.log(currencySelectRef?.current?.value);
    console.log(currencySelectRef);
    console.log(t);
    return o2[t].short
  }

  // let currencyPillText = defaultInput.price_currency_type;

  // const [currencyPillText, setCurrencyPillText] = useState('');
  // setCurrencyPillText(getValues('price_currency_type'));
  // ((value) => {
  //   setCurrencyPillText(value);
  // })(getValues('price_currency_type'));

  // ((value) => {
  //   // console.log('setting...');
  //   currencyPillText = value;
  // })(watch('price_currency_type'));

  // const currencyPillText = watch('price_currency_type');
  // console.log(getValues('price_currency_type'));

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(JSON.stringify({ ...defaultInput, ...data }, null, 4));

  const currencySelectRef = useRef(null);

  // console.log(watch('price_currency_type'));
  // console.log(typeof watch('price_currency_type'));

  // function joey(bla: any) {
  //   console.log(bla);
  //   console.log(arguments);
  // }

  // joey(watch('price_currency_type'));

  return (
    <>
      <main>
        <header>
          <h1>What are you creating?</h1>
          <div className="actions">
            <a className="button" href="/products">
              <span className="icon icon-x-square"></span>
              <span>Cancel</span>
            </a>
            <button className="accent" type="submit" form="new-product-form-:R0:">
              Next: Customize
            </button>
          </div>
        </header>
        <div>
          <form id="new-product-form-:R0:" className="row" onSubmit={handleSubmit(onSubmit)}>
            <section>
              <header>
                <p>
                  Make some selections, fill in some boxes, and go live in minutes.
                  <br />
                  <br />
                  Our <a href="/help/adding-a-product">Help Center</a>
                  has everything you need to know.
                </p>
              </header>
              <fieldset>
                <legend>
                  <label htmlFor="name-:R0:">Name</label>
                </legend>
                <input {...register('name')} />
              </fieldset>
              <fieldset>
                <legend>
                  <div>Type</div>
                </legend>
                <div
                  className="radio-buttons"
                  role="radiogroup"
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr)' }}
                >
                  <button className="vertical" type="button" role="radio" aria-checked="true" data-type="digital">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAArlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARCg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAJDqfWpHffsv/kOjPdbyPUYIgEh2/bK5gNlfvh9pQLUgQCQ4wGyyASHQ/JDofEh3vh9lwP2V/SHQQCQ8wGyvPdb1PLUmPUYNfNldQLUmvY6CgWpGvY59vP2VvP2ZwP2b///8toNSiAAAAGHRSTlMAUJ/fz0AgkICgEHCP7++/bzA/T69ff2BXGt5SAAAAAWJLR0Q51wCVQAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+cFDBYAK/G0l9AAAALgSURBVFjD7ZjtWuIwEIWxAUQ+FkXRNgkksJVSS6HVdfX+r2yXKf1Im6S1zU/OTy3vk5nMnEnS6111VWfdWMjO1bcGHXHIwYTmWq0ZGnbg3TJOy8Js1Jp3t9nSqkhb4nj0m0pF2GQo11hNG06R+0rkQLpiCrkzS5Hhya+diqYVwcySLfOusDju7TN5uBbpv/WrxJGTfxAwTjJxZ1O/yt28zBswUigScaOdoJ7oTEpAVAisHCQ5NEjkbFxaYCEjld+Hx3ri6V4ATiP46xq2ISx/HLt7jTxIFhezOId2w6/H8zZUWmVLdIogOn8mAGcACXmbOqQO/Gw/KGbRhv/sWxU2jWETT8xFec8YAJ7bM3ZHRoH/qyecmgVS/0I0BqQ+G5gFXgrSIJCGg87A9yDRR+JV087AbOKCBfK+FLiO5cI6oM3TJqwC32y5/miB4Jy2FOi7TXlF4KcaSAMJzv3Q59A+e8wRyYE+q/JWTTblc67YZd6QVwDCjsX3qrJxRN6B1JYNfMGGKmB5iQzXAMOsDBWFHZeDDokWCIPp71QNlJTOhmiAMBzZg8YcZKUTEBUQhhVBOj+UlI4klSnwC1rW0hoslrZLCRkXGpl6C71jp6VzEokyYDFiNZCnLYCL0UtXCIc0bNUNqThLz06xwBSYRPxYByRu5iIkli7wAoQjlm+Pa8dokLrIue9ZFlsF+A4RP9UP+nN15+exiF06tgJMziPLBicHLKyJxN/yNEMQ7rDJUcRJUqgfUrkV1gO5TeqBiRUum52+Vg3GaG6FBs42wkQ2BIwy8zcEJLkVGgFCMx5RzxgQrDCwzAHBGMKFMaBghSaAghWaAApWmFxGAbVvd5PyDsl9tHrXi5K73g+F7W/BCkHPX8nFPGQttKOCFSb35QPtqPINfB51BMaW+ETwcCCdeKvK89iEdSESdlN5Z3nuQOTuUvIS9II2fNvqZclDC/nb18t8Zv9c6Onx+oZ7lQH9AxdG7RuKS/tmAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTEyVDIxOjU3OjA5KzAwOjAwMYNH6AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0xMlQyMTo1NzowOSswMDowMEDe/1QAAAAASUVORK5CYII="
                      alt="Digital product"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>Digital product</h4>
                      Any set of files to download or stream.
                    </div>
                  </button>
                  <button className="vertical" type="button" role="radio" aria-checked="false" data-type="course">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAwFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCwoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKCUaeG8hlosjoJQcgngQRkECCgkSUEoejIIEFBMFFBMRUEoNPDgTWlMWZF0LMi4PRkENPDcfjIEejIEEFBIYbmUcgnkKMi4IKCUPRkAYbmYCCgoVZF0TWlQFFBIUWlMfjIIVZFwHHhwGHhwhlooLMi8WZFwHHhv///8dzNi7AAAAFnRSTlMAYL/vz58gcN/vEH9vj0CQUD9fME8vhErvvwAAAAFiS0dEPz5jMHUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfnBQwWAREuo38jAAADHklEQVRYw+3YCXOiMBQAYLcqxWu3e5EQiIRI5eoWj6pV1v3/P2uRwwYCyLUz3Zm+cUadiZ8hvLyE9Hof8X7j011fahWDocBwwgBAGbUKRcX3b544R+1DI1dx2IUXiKNx3EEddRN0EoHTRUegIkbgzOgIRFI8hI/BZ9gua6Rl1yD4ADsFw7RROgSnZpxG1mOz9CN2nNiDeOphuRvQHMbF4Y52AjpYuJYv4woqeTOgEui4E6Ygqq17+ISnbMkmrUE66eWCDk0CdgPKV/BX0t42ngmWJOyt1g1ALqC3Mbe27EEZvoCdZbcEHQ9El+6Fb9pCoq1Ag+zjT148pNpiZzcHqX5AGRChOSdWBhmPAZGRFauCkPFYEM1BM9Blv7IgAkYTkIbLtWKtZA7UsNwAdC8XLLsvS8CBaEHrg6+hoxwvLw6EuD4YfoHuxsNzHkREqQ2elGCa6BBBBeWAllEblHxK5gV3OchFsy7oYHfB3krvBbKxsmqCiofTXfIkApg41gN9c6MSlAFTE25bCzSwKqN07gZgSqS0OgijEnjKXnJKfF6Xgp/FZQL6lh7106QcyIj4UAKOv+gwyeUgVeS8yRCBV/EVlMyUh76abEVUF7z9M4A8mIinx2LwQU9+6Lg6a8CdzIOR+KoXly9BjPsUTAySrodLNQe8iI57KAYn8UPKk/v7kCmwMjnngNJO+TMvqdgDGK2WR8ivKRo+54ASVssWKSlM080+d9XTCM0BVXQTjJ9t+XVZA0c7A2725Qu9aGdqaia2xFqzIDjc2DnMaDkYkCDYJhmnsHcmvLlZEkb2DTC43WtqWpa5VSpt5+7fJmhHG87J7mx3CvaEYV/6d1vidw4adqMoBA2SH1L8vtkUNJA5MJqBBeGQvKUuG+Y0BYolTyUOrgJ6X1PgpKwtiKan75bcNEdMn86Ny7qoHXE4hPviJr77LXPe9310LumjfLmZZcP8Z8adIAqiZ0Au+Hrg8422q9E071Dyx+yOixHXL2vANRpOx5VPPu+zzyRUbHmWOkmJvikKrU9nRWvtx6NH8Wzc4YFvfzD7+XH8/R/GX5w87nfZLd20AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTA1LTEyVDIxOjU3OjA5KzAwOjAwMYNH6AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wNS0xMlQyMTo1NzowOSswMDowMEDe/1QAAAAASUVORK5CYII="
                      alt="Course or tutorial"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>Course or tutorial</h4>
                      Sell a single lesson or teach a whole cohort of students.
                    </div>
                  </button>
                  <button className="vertical" type="button" role="radio" aria-checked="false" data-type="ebook">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAolBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARDgAAAAAgGQBgSwB/ZABvVwBQPwBAMgAQDQAAAAC/lwD/yQDfsACffQCPcQDvvAAwJQAfGQA/MgBfSwCvigCffgCAZQDPpAC/lgBwWABwVwCviQBPPwDPowCQcgAwJgBPPgCgfgD///+u31mfAAAAFXRSTlMAMGB/b1BAIBC/769fgN/PT5+P7z8A/f8xAAAAAWJLR0Q13rbZawAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+cFDBYBLpjFUh4AAAKOSURBVFjD7ZjrkpowFIB3xWptt3tpNwQCuRAUVKy6tu//bCWRBPECCcZ2xuk3k3/xk3MSwsl5ePjP48ATDAeKTyPNWPHZWDeaAB8KAl8RIg1QRLHky9enDt83gIkFlKHncZtvACixJGk1Plv7SuNLSwIR6QF6vSgcBvspHKbTdKbJNFCRQMbyKpzk7aLQg3LGHCwwXWIN02hhCGIUgv30YtIhpEYrswCUpisj4WxeBt1t/IkIj7iBkEflnFgTTRWNrOJyHiVBYiAs0H5UcKo4zGpYzswYgdBeeB5hyhLXQuhYCA2FFFRCfGFZ5n2Fl5aFXyt0FrJz4Vrmrd7Nm+qEwLUwCayeUOat3s15dUKIN12YSiHzXYUsTP9euD1/tkLaQygG4efPVoj7Cl2GfBshDeow69CLQucwsM1hUgt1XeIjNFdC33HIzFAovilOhSRWOVRpywvFdUJ+Ws8trxI6D/mvCtehFMp33olQmO5LKDY34ccFUkXeQygHOSqQFMveQoch30bINxudt8OjESshsn1C/SVm7PBo/KiEa1OhKJxNQi5MhVN6IyGvrznsoApxIdRXXXzzkHeuhNudFMp33omwKoDuSRhxx8IpvQvhzrUQOBZurYRBo8ZUbNWtr9jXfGbCWXkEsGaNqUh18wtZCo0aX6bCX3nzh6G6Na9ODggzYXJ0jYpl5rYYR82VYqGhkIPfzZaPypzf/COQiw+fgZAsAexuBPFsVT4gbheqZhrN4vS0pmlcW4IIlOOjo1VVt/v48viW3Pw2Sxb7nGbfLzcQJ1YNU7V7Wlqco8i6xclTr7UJ+yOx0zHgtbeJx2/RRmQ/a6EuQtNo8t7ZyR6/Dj3Pe2rhXfNo3iC/Z/4AN1vMcj55RXYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMTJUMjE6NTc6MDkrMDA6MDAxg0foAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTEyVDIxOjU3OjA5KzAwOjAwQN7/VAAAAABJRU5ErkJggg=="
                      alt="E-book"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>E-book</h4>
                      Offer a book or comic in PDF, ePub, and Mobi formats.
                    </div>
                  </button>
                  <button className="vertical" type="button" role="radio" aria-checked="false" data-type="membership">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAtFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEQQAAAAAAAAAAAAQEAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PQ1pahZ4eRkAAABaWxPT1S3x8zN5ehq1tiYeHwfExirExSkPDwOHiByXmCAeHgZLSw8tLQnT1CyIiR2Wlx9aWhKmpyO0tibi5DCWmCAtLgo8PAxLTBDi4y8PEASlpyNqaxfS1Cz////7ctoMAAAAGXRSTlMAQG9/EIDvnyAw31DvcF+v78+/H2CgP49PepLiXAAAAAFiS0dEOzkO9GwAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAHdElNRQfnBQwWATBiym99AAADwklEQVRYw72ZbWOaMBDHtVof6Gandd0giQEmmIoPIA+6ff8PNkRIAiRIqNu9ain8epe7++cIvd5/sP7TQMH6w2ba8HmkG6C9GTocTxp4Uw2tsJqtTO1FzvtiYXVb2V8lvMnoF8adiDMx8NXE+JHEvo272trpC4BjF3cnfpvWgfM1fiwR4s/YZlStxwkp/vZB2trWY8TdXAokltfSIOGI+kwK9OoR7Q9HQZzQ5O61FgpAH0Io+DcQmySgvzlv7YGnFGiJgNgMKRHN2gMDG4rK/loYjAgGCmuIhUWaVdrWugtsrYgZMJIAh04B3KLWQNQAZB5uW/cgRKgNULiGYiBOiTLgNOwCTIkyYF8v5a4tECMoAb7E3YDSslmi/LpHKo95DryZKwTKQh6Aom/1ymMo32tcQwk4PkmA+6LpTkgJuCiuVxzxnJXM9WYg3VIAKPHIjrZzqASkuY15KV0Tk2OrAFldR5zwufYGdwSyMnSoYvqRflu/pAOQVo1HVQec8+XziaTim4CLYy2Xm+In0gU4KooDsKqxb7ciciMHjgJwaguS7F5BSaxfdPU1pJ2MCZPXIM2PT37jS6wOfN3UcpKaYcTXsPPe8VUKmy7hJeYesM7mtYYMV7n1mLoiwZSYP5KKg1cS80AOZMMmEexQeamnTU5K24MnB2pFxGvBgFCsXXwEELLJowm4pBG7qA4sVoEcr7LNEX0pcEElYCsYicgq94fAMtGVASc0Tk8Q8T53ep/vLDAs1hHJgGPqoFGK+JBZ4SApgMXcmhAJkLVdEV3uUry52jFXWshZJk1A5qFGHdzzpZvwdNeBJSMIROFKDHxmYUacPqcOMHYMa3Y2JZ2ytKkjPp8Sj12vupeavgskrTfRWGBbzsGA6LecRFENdzYseS+PUX1Hz4AAXDOys6u00LAaxYE5mNTaODlFVdgmuKM2TGYqNZj4Lk87h2hnBS3k6wmxgIv7/1zcw5YunB0bu6PXMM6VgdzuGaUZ+IhIVsBnO4wR2G3W3v35UAIMNrssC0dr7bQf2uvApUCulGbsKnBKHgzsjawHAwfowcChVnORRG0te4euisPUqTp0hK3tGkxNvpbOvnrC0Z6YbjB1gZ1o0T7pThRuo68jhxAuPaYCUfImNXybjtadiLJ3vV7vKz8VmHprW8mAve/oU6dVxlPvscTovX6mOze68zwoODEezkFnIBgLz507Ez0iPn+eaB2J24HsrLgTMYnG0tPsyYL4qrw9+dF0gL/UyIfC+T04OIv3O18Ypj9VvjDMhv/sU8dfzXB87lyBEl0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMTJUMjE6NTc6MDkrMDA6MDAxg0foAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTEyVDIxOjU3OjA5KzAwOjAwQN7/VAAAAABJRU5ErkJggg=="
                      alt="Membership"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>Membership</h4>
                      Start a membership business around your fans.
                    </div>
                  </button>
                  <button className="vertical" type="button" role="radio" aria-checked="false" data-type="physical">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAjVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwJQC/lwDvvAD/yQDfsACAZQBgSwAQDQBwWABAMgC/lgCffQCvigCffgAgGQB/ZADPowDPpACgfgCQcgBvVwBQPwBfSwCPcQA/MgBPPgCviQD///8/pXIGAAAAEnRSTlMAQL/v358goO9fEM+vMGBQTz9pLPwJAAAAAWJLR0QuVNMQhwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+cFDBYBJpYe2iwAAAJtSURBVFjD7djdmqIgAAZgU2urmWpXBJK1DLMpa+b+b28JJRTBFuXQ76CnJ+Gt+FPwvClT3GXmB5FVwvmiz/sFYoisgvfLlZFb+wmyDyYzk/cxxEMoDtcG7y8alnSl9/b86uFolYxVOX5qvEVYeSeatJPKHk2TTkiEWSuGZi+nWGly+vI0LZxHTxBF/R7EMud3nh5seZgq6fW0YMsr6EVTzejpwEX41fCInacBF+FFehkt2tWuvNbN6HXBjfAAm8UnonglrwS6E7yMDOAmaHh3ZdDAx1tPBTfLyiufldRBCMF7TwE3y8Ls1WO67cHjtSxvkQHcCi95euA/vDtJ7/eIGsAtEZ74kW899icgSGI9uK2GCHwwD5YgOzST6TzEPTYLiA7cVk3GvpC9nlMZIEur/UEg9xDQgDvhqcsqBEYP5TfKZ+m3BgzjqvbewmP3j5tp2Gz57MR9nro08o5KTKCf8QK2nhkM2N+BlJRKGq2dqtfKZ8enHHx0wYi3SOeeIwvuO9f4wkM5CAwg7UxSWTDuXDvwz2G72Hgwfr1zBF7bfTIeJJi1vUswAhmInIJKJnAC7UG+/jkEuYcDZ2C1Pv/4rsB6vf9eOQK/6s/5M7sD8CLuNDs34Murtj2jwdoras8Eyi0F6gXFk3hBxLbMAPalAYon50LubUeB0tt4LkDhnRreGPDlBQ1vBCieeU5h0xsOSq99ejEUFF6ueENBozcQNHs1iG3y0+dxEAJqFdDjeSFGQ6P1vM/jYO9De+7zOx3oXfWe2KdYpzR53owMacXSXxvP4nZBfrbT4AHM+w4LF/PQ7vAx8P9MR7ZTHOYfiqSJm56IAXwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDUtMTJUMjE6NTc6MDkrMDA6MDAxg0foAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA1LTEyVDIxOjU3OjA5KzAwOjAwQN7/VAAAAABJRU5ErkJggg=="
                      alt="Physical good"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>Physical good</h4>
                      Sell anything that requires shipping something.
                    </div>
                  </button>
                  <button className="vertical" type="button" role="radio" aria-checked="false" data-type="bundle">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAsVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARCg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCQ5wP2a/bK7vh9r/kOjPdbyfWpFAJDrffstgNld/SHQgEh0wGyvvh9mQUYJQLUjQdb3AbK6PUYMQCQ/Pdb0wGyyASHSgWpGwY6BwP2XgfsuwY5+QUYOvY6CvY59fNldQLUn////2oYiJAAAAGHRSTlMAEH+/78+fUI/fIGBAkK/vwIDQMLDgoHBBhiG2AAAAAWJLR0Q6TgnE+gAAAAd0SU1FB+cMDQYxIue/jqIAAAM8SURBVFjD7Zdpd6IwFIZda1VstZ0lYZEkXMHiElqtHf7/H5uIIUCwLGe+zeH9FIN5zs29b7Zer1OnTp06ZeoPhiNUp/HDpCnuEZuW7dTIXrtkOpg14M3GZi1NirLpvD6+qec0F4VBHfCROW1ENzdifybUvzdhoK2Ajg8DYzEcYRDCo+FiolEX7QJMYiSeJaOwrWCLngrVH1rOP8p2N/lSjdIKv4WVqjSCBU/KT0j2hZhUCpPKXHvTiQ4kNTPb7Q+N/NQY6LjVfkiJzYGOd7SricYdIOey6jSK5HArepf/+cgsZosavml8azQrAX2EuJwgQqdbiyFIh5Dbx9AEvCFkg4+skAX+VAKeEZLVZAh93mLZoD1Vq0T0rQl4smPtQR7pY0MDnq/73i6Z3bWV/BdEQyWPYivAu0Lx4TMX4lADCsyW2DcMbM0EIXAQqSFrpNea5oj+c78IDFTiAMmq03TqMrW4ZB4RtWqTeRFoIRSlldjLaWKUNxRcvKPul6/sD8GiCPQxYqrIlo4WvUTU509pfwIV4nmpVZmko4V/TOkuFbXDjySGg7+JNOCHSgqdasAsMIFOvZBG7WwOxOKmc471Rcm+BWaBBXl0ms5THAVmeZUG5rfAXGB30JxtGZwdpp9qTE051HN4HX1IjQM62v/AsHM46HtE5qTgQbMNPcsSXK5rLxl4EOh80i4lI/Ks7EzzoTjIEDondiYYJZ/cfYzyTqQlXpTrgVkBSK8LOPkcXFvJRONrK8rxQDNNkOO5S20tU1XRL7GqbwSOUFYEW2w0hQ0mJMfcL5j3SsZO9z61MYaqyEJbLzkLSBCKNX8KOSlsPe64tB+6XE7IV1u3xZg6nbhM5pd5TTEQ0yruErN2Z8odwxQOfFi1PKQulceefVy1PPUorKu+Sl5zIAW34msIK/3mALxSW+xW3mwN/bLkV/O4+309QvN5lV0Sx+2vcxceZqUQXhyt8nfOFW/Nmy6W6EiYUAzoZWFod/a93Y63fn4Vw16NudDk3i17Ebfj4brnT3/cZtLByKh/qIzjpg+BkCybPKV6q2kchaeSirfu94DhpdH0tTf/sfxZ0suyoF+/Z90zu1OnTp3+I/0Fus51K2zqbB4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMTItMTNUMDY6NDQ6NTIrMDA6MDBM8ZrcAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTEyLTEzVDA2OjQ0OjUyKzAwOjAwPawiYAAAAABJRU5ErkJggg=="
                      alt="Bundle"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h4>Bundle</h4>
                      Sell two or more existing products for a new price
                    </div>
                  </button>
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <label htmlFor="price-:R0:">Price</label>
                </legend>
                <div className="input">
                  <label className="pill select">
                    <span>{currencyPillText()}</span>
                    <select
                      aria-label="Currency"
                      ref={currencySelectRef}
                      defaultValue={defaultInput.price_currency_type}
                      {...register('price_currency_type')}
                    >
                      <option value="usd">$ (US Dollars)</option>
                      <option value="gbp">£ (GBP)</option>
                      <option value="eur">€ (Euro)</option>
                      <option value="jpy">¥ (Yen)</option>
                      <option value="inr">₹ (Rupees)</option>
                      <option value="aud">A$ (Australian Dollars)</option>
                      <option value="cad">CAD$ (Canadian Dollars)</option>
                      <option value="hkd">HK$ (Hong Kong Dollars)</option>
                      <option value="sgd">SGD$ (Singapore Dollars)</option>
                      <option value="twd">NT$ (Taiwanese Dollars)</option>
                      <option value="nzd">NZ$ (New Zealand Dollars)</option>
                      <option value="brl">R$ (Brazilian Real)</option>
                      <option value="zar">ZAR (South African Rand)</option>
                      <option value="chf">CHF (Swiss Franc)</option>
                      <option value="ils">₪ (Israeli Shekel)</option>
                      <option value="php">₱ (Philippine Peso)</option>
                      <option value="krw">₩ (Korean Won)</option>
                      <option value="pln">zł (Polish zloty)</option>
                      <option value="czk">Kč (Czech koruna)</option>
                    </select>
                  </label>
                  <input
                    id="price-:R0:"
                    type="text"
                    maxLength={10}
                    placeholder="Price your product"
                    autoComplete="off"
                    aria-invalid="false"
                    {...register('price_range')}
                  />
                </div>
              </fieldset>
            </section>
          </form>
        </div>
      </main>
    </>
  );
};

export default NewProductPage;
