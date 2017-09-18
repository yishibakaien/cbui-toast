// 类型、默认状态、属性定义
module.exports = {
    toast: {
        loading: {
            className: 'loading',
            defaultText: '请稍后...'
        },
        info: {
            className: 'info',
            defaultText: '警告',
            defaultDuration: 1500
        },
        success: {
            className: 'success',
            defaultText: '已完成',
            defaultDuration: 800
        },
        error: {
            className: 'error',
            defaultText: '错误',
            defaultDuration: 1500
        }
    },
    alert: {
        alert: {
            className: 'alert'
        }
    },
    confirm: {
        confirm: {
            className: 'confirm'
        }
    },
    tip: {
        tip: {
            className: '_blackTip_tip_',
            defaultText: '',
            defaultDuration: 2100
        }
    }
};