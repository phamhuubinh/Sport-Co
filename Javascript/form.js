// Validator
function Validator(options) {
    const selectorRules = {}
    // hàm thực hiện validate
    function validate(inputElement, rule) {
        const errorElement = inputElement.parentElement.querySelector(options.errorMessage)
        let errorMessage
        // lấy ra các rules của selector
        const rules = selectorRules[rule.selector]
        // lặp qua từng rule và kiểm tra
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            // nếu có lỗi thì dừng kiểm tra
            if (errorMessage) break
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage
    }
    // lấy element của form cần validate
    const formElement = document.querySelector(options.form)
    if (formElement) {
        // khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault()
            let isFormValid = true
            // thực hiện lặp từng rule và validate
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)
                const isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    const enableInput = formElement.querySelectorAll('[name]:not([disable])')
                    const formValues = Array.from(enableInput).reduce(function (values, input) {
                        values[input.name] = input.value
                        return values
                    }, {})
                    options.onSubmit(formValues)
                }
            } else {
                console.log('error');
            }
        }
        // lặp qua mỗi rule và xử lý (blur, input, ...)
        options.rules.forEach(rule => {
            // lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }
            const inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }
                // xử lý trường hợp khi người dùng nhập vào input
                inputElement.oninput = function () {
                    const errorElement = inputElement.parentElement.querySelector(options.errorMessage)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }

            })
        });
    }
}

// định nghĩa rules
Validator.isFirstName = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : "Vui lòng nhập tên của bạn"
        }
    }
}
Validator.isLastName = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : "Vui lòng nhập họ của bạn"
        }
    }
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}
Validator.isPhone = function (selector, number) {
    return {
        selector: selector,
        test: function (value) {
            return value.length === number ? undefined : 'Vui lòng nhập đúng định dạng số điện thoại'
        }
    }
}
Validator.isCity = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value == 0 ? "Vui lòng chọn thành phố của bạn" : undefined
        }
    }
}
Validator.isDistrict = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value == 0 ? "Vui lòng chọn quận của bạn" : undefined
        }
    }
}
Validator.isCommune = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value == 0 ? "Vui lòng chọn phường của bạn" : undefined
        }
    }
}
Validator.isAddress = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : "Vui lòng nhập địa chỉ của bạn"
        }
    }
}

// danh sách tỉnh huyện xã
const provicesApi = 'https://provinces.open-api.vn/api/p/'
const districtsApi = 'https://provinces.open-api.vn/api/d/'
const wardsApi = 'https://provinces.open-api.vn/api/w/'

// render danh sách thành phố
getListProvices(function (provices) {
    const listProvicesBlock = document.querySelector('#city')
    const htmls = provices.map(function (provice) {
        return `
        <option value="${provice.code}">${provice.name}</option>
        `
    })
    listProvicesBlock.insertAdjacentHTML('beforeend', htmls)
})
// render danh sách quận
function changeProvices() {
    const idProvince = document.getElementById('city').value
    getListDistricts(function (districts) {
        const listDistrictBlock = document.querySelector('#districts')
        const htmls = districts.map(function (district) {
            const checkid = district.province_code == idProvince
            if (checkid) {
                return `
            <option class="clearValueDistrict" value="${district.code}">${district.name}</option>
            `
            }
        })
        listDistrictBlock.insertAdjacentHTML('beforeend', htmls)
    })
    const listDistricts = document.querySelectorAll(".clearValueDistrict")
    listDistricts.forEach(e => e.remove())
    const listWards = document.querySelectorAll(".clearValueWard")
    listWards.forEach(e => e.remove())
}
// render danh sách xã
function changeDistricts() {
    const idDistrict = document.getElementById('districts').value
    getListWards(function (wards) {
        const listWardsBlock = document.querySelector('#communes')
        const htmls = wards.map(function (ward) {
            const checkid = ward.district_code == idDistrict
            if (checkid) {
                return `
                <option class="clearValueWard" value="${ward.code}">${ward.name}</option>
                `
            }
        })
        listWardsBlock.insertAdjacentHTML('beforeend', htmls)
    })
}

// Functions call api thành phố
function getListProvices(callback) {
    fetch(provicesApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

// Functions call api quận huyện
function getListWards(callback) {
    fetch(wardsApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

// Functions call api phường xã
function getListDistricts(callback) {
    fetch(districtsApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function closeModal() {
    document.getElementById('form-1').reset()
}