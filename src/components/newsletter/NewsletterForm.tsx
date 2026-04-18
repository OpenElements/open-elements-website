'use client';
import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [emailError, setEmailError] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get('EMAIL')?.toString() || '';

    if (!email.trim()) {
      setEmailError('Dieses Feld darf nicht leer sein. ');
      setStatus('idle');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(
        'Die eingegebenen Informationen sind nicht gültig. Bitte überprüfe das Feldformat und versuche es erneut.',
      );
      setStatus('idle');
      return;
    }

    setEmailError('');
    setStatus('loading');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // This avoids CORS issues while sending data like a standard form
      });
      setStatus('success');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };
  return (
    <>
      <div className="sib-form">
        <div id="sib-form-container" className="sib-form-container">
          {/* Error message panel */}
          <div
            id="error-message"
            className="sib-form-message-panel"
            style={{
              display: status === 'error' ? 'block' : 'none',
              fontSize: '16px',
              textAlign: 'left',
              fontFamily: 'Helvetica, sans-serif',
              color: '#661d1d',
              backgroundColor: '#ffeded',
              borderRadius: '3px',
              borderColor: '#ff4949',
              maxWidth: '540px',
              margin: '0 auto',
              marginBottom: '2rem',
            }}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}>
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Deine Anmeldung konnte nicht gespeichert werden. Bitte versuche
                es erneut.
              </span>
            </div>
          </div>

          {/* Success message panel */}
          <div
            id="success-message"
            className="sib-form-message-panel"
            style={{
              display: status === 'success' ? 'block' : 'none',
              fontSize: '16px',
              textAlign: 'left',
              fontFamily: 'Helvetica, sans-serif',
              color: '#085229',
              backgroundColor: '#e7faf0',
              borderRadius: '3px',
              borderColor: '#13ce66',
              maxWidth: '540px',
              margin: '0 auto',
              marginBottom: '2rem',
            }}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '10px',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}>
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Deine Anmeldung war erfolgreich.
              </span>
            </div>
          </div>

          <div
            id="sib-container"
            className="sib-container--large sib-container--vertical">
            <form
              id="sib-form"
              method="post"
              action="https://83f3e12d.sibforms.com/serve/MUIFAB9sPNc3vI_F5JWU2bS-86BYNSqnfAE1iEffv9m5QAMla1vDwNMH018M6CMOEAayrpPErJwxgmRV2HONP5VCeXqpiRm9pE9PDqyKvT9-mdLefQARE-ZzgPXXqqRU6WUay4AjAXyo3QVaUkuLKJ8Uwi51A4s__AYJERdqu88aZC1bL5ot2NJzfX9lu3oTNSgY6hHDVqr04aOS"
              data-type="subscription"
              noValidate
              onSubmit={handleSubmit}>
              <div style={{ padding: '8px 0' }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label
                        className="entry__label text-blue sm:text-base text-sm font-medium inline-block sm:ml-4 ml-3 mb-0.5"
                        htmlFor="VORNAME">
                        Gib dein(e) VORNAME ein
                      </label>
                      <div className="entry__field">
                        <input
                          className="input border bg-white border-purple rounded-full sm:text-base text-sm sm:px-6 px-5 py-3 w-full focus:border-purple-700 focus:ring-0 focus:outline-none"
                          maxLength={200}
                          type="text"
                          id="VORNAME"
                          name="VORNAME"
                          autoComplete="off"
                          placeholder="VORNAME"
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary text-xs text-rose"></label>
                  </div>
                </div>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label
                        className="entry__label text-blue sm:text-base text-sm font-medium inline-block sm:ml-4 ml-3 mb-0.5"
                        htmlFor="NACHNAME">
                        Gib dein(e) NACHNAME ein
                      </label>
                      <div className="entry__field">
                        <input
                          className="input border bg-white border-purple rounded-full sm:px-6 px-5 py-3 sm:text-base text-sm w-full focus:border-purple-700 focus:ring-0 focus:outline-none"
                          maxLength={200}
                          type="text"
                          id="NACHNAME"
                          name="NACHNAME"
                          autoComplete="off"
                          placeholder="NACHNAME"
                        />
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary text-rose text-xs"></label>
                  </div>
                </div>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label
                        className="entry__label text-blue sm:text-base text-sm font-medium inline-block sm:ml-4 ml-3 mb-0.5"
                        htmlFor="EMAIL"
                        data-required="*">
                        Gib deine E-Mail-Adresse ein, um dich anzumelden
                      </label>
                      <div className="entry__field">
                        <input
                          className="input border bg-white border-purple rounded-full sm:px-6 px-5 py-3 sm:text-base text-sm w-full focus:border-purple-700 focus:ring-0 focus:outline-none"
                          type="email"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="email"
                          placeholder="EMAIL"
                          data-required="true"
                          required
                        />
                      </div>
                    </div>
                    {emailError && (
                      <label
                        className="entry__error entry__error--primary"
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          marginTop: '8px',
                          fontSize: '16px',
                          textAlign: 'left',
                          fontFamily: 'Helvetica, sans-serif',
                          color: '#661d1d',
                          backgroundColor: '#ffeded',
                          borderRadius: '3px',
                          border: '1px solid #ff4949',
                        }}>
                        {emailError}
                      </label>
                    )}
                    <label className="entry__specification text-sm sm:ml-5 ml-4 mt-3 inline-block">
                      Gib bitte deine E-Mail-Adresse für die Anmeldung an, z. B.
                      abc@xyz.com.
                    </label>
                  </div>
                </div>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div className="sib-form-block" style={{ textAlign: 'left' }}>
                  <button
                    className="sib-form-block__button sib-form-block__button-with-loader flex items-center justify-center gap-3 bg-purple hover:bg-purple-700 rounded-full font-bold text-white w-full py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    form="sib-form"
                    disabled={status === 'loading'}
                    type="submit">
                    {status === 'loading' && (
                      <svg
                        className="icon animate-spin size-5 text-white fill-current"
                        viewBox="0 0 512 512">
                        <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"></path>
                      </svg>
                    )}
                    ANMELDEN
                  </button>
                </div>
              </div>
              <div style={{ padding: '8px 0' }}>
                <div className="sib-form__declaration flex sm:flex-row flex-col sm:items-center sm:gap-5 gap-1 sm:mt-0 mt-5">
                  <div className="declaration-block-icon sm:size-16 size-14 shrink-0">
                    <svg
                      className="icon__SVG"
                      width="0"
                      height="0"
                      xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <symbol id="svgIcon-sphere" viewBox="0 0 63 63">
                          <path
                            className="path1"
                            d="M31.54.0l1.05 3.06 3.385-.01-2.735 1.897 1.05 3.042-2.748-1.886-2.738 1.886 1.044-3.05-2.745-1.897h3.393zm13.97 3.019L46.555 6.4l3.384.01-2.743 2.101 1.048 3.387-2.752-2.1-2.752 2.1 1.054-3.382-2.745-2.105h3.385zm9.998 10.056 1.039 3.382h3.38l-2.751 2.1 1.05 3.382-2.744-2.091-2.743 2.091 1.054-3.381-2.754-2.1h3.385zM58.58 27.1l1.04 3.372h3.379l-2.752 2.096 1.05 3.387-2.744-2.091-2.75 2.092 1.054-3.387-2.747-2.097h3.376zm-3.076 14.02 1.044 3.364h3.385l-2.743 2.09 1.05 3.392-2.744-2.097-2.743 2.097 1.052-3.377-2.752-2.117 3.385-.01zm-9.985 9.91 1.045 3.364h3.393l-2.752 2.09 1.05 3.393-2.745-2.097-2.743 2.097 1.05-3.383-2.751-2.1 3.384-.01zM31.45 55.01l1.044 3.043 3.393-.008-2.752 1.9L34.19 63l-2.744-1.895-2.748 1.891 1.054-3.05-2.743-1.9h3.384zm-13.934-3.98 1.036 3.364h3.402l-2.752 2.09 1.053 3.393-2.747-2.097-2.752 2.097 1.053-3.382-2.743-2.1 3.384-.01zm-9.981-9.91 1.045 3.364h3.398l-2.748 2.09 1.05 3.392-2.753-2.1-2.752 2.096 1.053-3.382-2.743-2.102 3.384-.009zM4.466 27.1l1.038 3.372H8.88l-2.752 2.097 1.053 3.387-2.743-2.09-2.748 2.09 1.053-3.387L0 30.472h3.385zm3.069-14.025 1.045 3.382h3.395L9.23 18.56l1.05 3.381-2.752-2.09-2.752 2.09 1.053-3.381-2.744-2.1h3.384zm9.99-10.056L18.57 6.4l3.393.01-2.743 2.1 1.05 3.373-2.754-2.092-2.751 2.092 1.053-3.382-2.744-2.1h3.384zm24.938 19.394-10-4.22a2.48 2.48.0 00-1.921.0l-10 4.22A2.529 2.529.0 0019 24.75c0 10.47 5.964 17.705 11.537 20.057a2.48 2.48.0 001.921.0C36.921 42.924 44 36.421 44 24.75a2.532 2.532.0 00-1.537-2.336zm-2.46 6.023-9.583 9.705a.83.83.0 01-1.177.0l-5.416-5.485a.855.855.0 010-1.192l1.177-1.192a.83.83.0 011.177.0l3.65 3.697 7.819-7.916a.83.83.0 011.177.0l1.177 1.191a.843.843.0 010 1.192z"
                            fill="#0092ff"></path>
                        </symbol>
                      </defs>
                    </svg>
                    <svg className="svgIcon-sphere w-full h-full">
                      <use xlinkHref="#svgIcon-sphere"></use>
                    </svg>
                  </div>
                  <p className="text-blue sm:text-sm text-xs leading-6">
                    Wir verwenden Brevo als unsere Marketing-Plattform. Indem du
                    das Formular absendest, erklärst du dich einverstanden, dass
                    die von dir angegebenen persönlichen Informationen an Brevo
                    zur Bearbeitung übertragen werden gemäß den
                    <a
                      href="https://www.brevo.com/de/legal/privacypolicy/"
                      className="text-purple-700 font-medium underline"
                      target="_blank">
                      Datenschutzrichtlinien von Brevo.
                    </a>
                  </p>
                </div>
              </div>
              <input
                type="text"
                name="email_address_check"
                className="input--hidden hidden"
                aria-hidden="true"
              />
              <input type="hidden" name="locale" value="de" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
