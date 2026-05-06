document.addEventListener('DOMContentLoaded', function () {
  const e = document.querySelectorAll('.registerBtn'),
    t = document.getElementById('registrationModal'),
    n = document.getElementById('closeModalBtn'),
    o = document.querySelector('.homeModalOverlay'),
    d = document.getElementById('registrationForm'),
    r = document.getElementById('phone'),
    c = document.getElementById('phoneError'),
    nameInput = document.getElementById('name'),
    nameError = document.getElementById('nameError'),
    i = document.getElementById('submitBtn'),
    s = document.getElementById('selectedCountry'),
    m = document.getElementById('selectedCountryCode'),
    u = document.getElementById('countryDropdown'),
    y = document.getElementById('dropdownIcon'),
    E = setupPhoneFormatter({
      inputEl: r,
      codeLabelEl: m,
      dropdownEl: u,
      triggerEl: s,
      iconEl: y,
      errorEl: c,
      defaultCode: '+998'
    })
  let g = !1,
    p = 0
  function f () {
    t &&
      ((g = !0),
      (p = window.scrollY),
      (t.style.display = 'block'),
      (document.body.style.overflow = 'hidden'),
      (c.style.display = 'none'),
      nameError && (nameError.style.display = 'none'))
  }
  function v () {
    t &&
      g &&
      ((g = !1),
      (t.style.display = 'none'),
      (document.body.style.overflow = ''),
      (document.body.style.position = ''),
      (document.body.style.top = ''),
      window.scrollTo(0, p))
  }
  e.forEach(e => e.addEventListener('click', f)),
    n && n.addEventListener('click', v),
    o && o.addEventListener('click', v),
    document
      .querySelectorAll('.title, .event__list__title, .text span, .expert__img')
      .forEach(function (el) {
        el.style.cursor = 'pointer'
        el.addEventListener('click', f)
      }),
    d.addEventListener('submit', function (e) {
      e.preventDefault()
      const phoneVal = r.value.trim()
      const nameVal = nameInput ? nameInput.value.trim() : ''
      let hasError = false

      if (nameInput && nameError) {
        if (nameVal.length < 2) {
          nameError.style.display = 'block'
          hasError = true
        } else {
          nameError.style.display = 'none'
        }
      }

      if (E.validate(phoneVal)) {
        c.style.display = 'none'
      } else {
        c.style.display = 'block'
        hasError = true
      }

      if (hasError) return

      i.textContent = 'YUBORILMOQDA...'
      i.disabled = !0
      const dt = new Date(),
        dateStr = dt.toLocaleDateString('uz-UZ'),
        timeStr = dt.toLocaleTimeString('uz-UZ'),
        payload = {
          Ism: nameVal,
          TelefonRaqam: E.getCurrentCode() + ' ' + phoneVal,
          SanaSoat: dateStr + ' - ' + timeStr
        }
      localStorage.setItem('formData', JSON.stringify(payload))
      window.location.href = '/thankYou.html'
      i.textContent = 'DAVOM ETISH'
      i.disabled = !1
      r.value = ''
      if (nameInput) nameInput.value = ''
      v()
    })
}),
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.webinar-faq__dropdown').forEach(e => {
      const t = e.querySelector('.webinar-faq__dropdown__head')
      t &&
        t.addEventListener('click', function () {
          if (e.classList.contains('is-open'))
            e.classList.remove('is-open'), (e.style.maxHeight = '80px')
          else {
            e.classList.add('is-open'), (e.style.maxHeight = '200px')
            const t = e.scrollHeight
            e.style.maxHeight = t + 'px'
          }
        })
    })
  }),
  document.addEventListener('DOMContentLoaded', () => {
    const minutesEl = document.getElementById('minutes')
    const secondsEl = document.getElementById('seconds')
    if (!minutesEl || !secondsEl) return
    let t = 120
    const render = () => {
      const m = Math.floor(t / 60)
      const s = t % 60
      minutesEl.textContent = String(m).padStart(2, '0')
      secondsEl.textContent = String(s).padStart(2, '0')
    }
    render()
    const id = setInterval(() => {
      t--
      if (t < 0) {
        clearInterval(id)
        return
      }
      render()
    }, 1000)
  })
