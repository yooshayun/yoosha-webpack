import { locations } from '@/api/common/common';
import { mapGetters, mapState } from 'vuex';

export default {
    directives: {
        scroll: {
            bind: function(el, binding) {
                el.addEventListener('scroll', () => {
                    if (el.scrollTop + el.offsetHeight >= el.scrollHeight + 2) {
                        let fnc = binding.value;
                        fnc();
                    }
                });
            }
        }
    },
    data() {
        return {
            pars: {}
        };
    },
    computed: {
        ...mapGetters([
        //     'gender',
        //     'dance_age',
        //     'dance_type',
        //     // 'danceTypeList',
        //     'default_payment',
        //     'fit_age_group',
        //     'from_source',
        //     'level',
        //     'objective',
        //     'occupation',
            // 'payment',
        //     'cardTypes',
        //     'accountsList',
        //     'provinceList',
        //     'memberLevelsList',
        //     'shopsList',
        //     'listPagePars',
        //     'countryCodesList'
        ]),
        ...mapState(['lang'])
    },
    methods: {
        //页面筛选信息初始化
        filterParamsInit(params={}){
            if (this.$store.state.listPagePars.has(this.$route.path) && this.$store.state.listPagePars.get(this.$route.path)) {
                let obj = Object.assign({}, this.$store.state.listPagePars.get(this.$route.path));
                for (let i in obj) {
                    if (i !== 'pageSize' && i !== 'pageIndex') {
                        params[i] = obj[i];
                    }
                }
            }
        },
        pageReset() {
            // console.log("调了页码初始化函数");
            this.page.pageIndex = 1;
            this.page.pageSize = 10;
        },
        resetPage() {
            this.$emit('pageReset');
        },
        city(val) { // 市
            if (val) {
                locations({ parentCode: val }).then(res => {
                    if (res.data.code === 0) {
                        this.cityList = res.data.data;
                    }
                });
            } else {
                this.cityList = [];
            }
            this.form.locationCode = val;
            this.search();
        },
        //折扣率换算中英文
        discountName(discount) {
            //判断当前中英文
            if(Number.isNaN(Number(discount))){
                return;
            }
            let name = '';
            if(this.lang == 'zh-cn') {
                if(discount == 100) {
                    name = '无折扣';
                } else if(discount == 0) {
                    name = '免费';
                } else {
                    name = (discount / 10) + '折';
                }
            } else {
                name = discount + '100%';
            }
            return name;
        },
        action(action) {
            let color = '',
                actionName = '';
            switch (action) {
                // case 'booking_activate':
                //     color = 'rgba(0, 168, 84, 0.7)';
                //     actionName = this.$t('message.common.moment');
                //     break;
                case 'activate':
                    color = 'rgb(0, 168, 84)';
                    actionName = this.$t('message.status.activate');
                    break;
                case 'transfer':
                    color = 'rgb(0, 168, 84)';
                    actionName = this.$t('message.status.transfer');
                    break;
                case 'stop':
                    color = 'rgb(228, 62, 49)';
                    actionName = this.$t('message.status.stop');
                    break;
                case 'freeze':
                    color = 'rgb(45, 140, 240)';
                    actionName = this.$t('message.status.freeze');
                    break;
                case 'unfreeze':
                    color = 'rgb(233, 101, 0)';
                    actionName = this.$t('message.status.unfreeze');
                    break;
                case 'delay':
                    color = '#821C49';
                    actionName = this.$t('message.status.delay');
                    break;
                case 'batch_delay':
                    color = '#821C17';
                    actionName = this.$t('message.status.batch_delay');
                    break;
                case 'create':
                    color = '';
                    actionName = this.$t('message.status.create');
                    break;
                case 'book':
                    color = '';
                    actionName = this.$t('message.status.book');
                    break;
                case 'cancel_book':
                    color = '';
                    actionName = this.$t('message.status.cancel_book');
                    break;
                case 'check':
                    color = '';
                    actionName = this.$t('message.status.check');
                    break;
                case 'cancel_check':
                    color = '';
                    actionName = this.$t('message.status.cancel_check');
                    break;
                case 'charge':
                    color = '';
                    actionName = this.$t('message.status.charge');
                    break;
                case 'deduct':
                    color = '';
                    actionName = this.$t('message.status.deduct');
                    break;
                case 'expired':
                    color = '';
                    actionName = this.$t('message.status.expired');
                    break;
                case 'register':
                    color = '';
                    actionName = this.$t('message.status.register');
                    break;
                case 'refund':
                    color = 'rgb(228, 62, 49)';
                    actionName = this.$t('message.status.refund');
                    break;
                case 'buyCard':
                    color = '';
                    actionName = this.$t('message.status.buyCard');
                    break;
                case 'bindingCard':
                    color = '';
                    actionName = this.$t('message.status.bindingCard');
                    break;
                case 'course_cancel':
                    color = '';
                    actionName = this.$t('message.status.course_cancel');
                    break;
                case 'recommend_consumption':
                    color = '';
                    actionName = this.$t('message.status.recommend_consumption');
                    break;
                case 'recommend_register':
                    color = '';
                    actionName = this.$t('message.status.recommend_register');
                    break;
                case 'change_point':
                    color = '';
                    actionName = this.$t('message.status.change_point');
                    break;
                case 'change_level':
                    color = '';
                    actionName = this.$t('message.status.change_level');
                    break;
                case 'balance_transfer':
                    color = 'rgb(228, 62, 49)';
                    actionName = this.$t('message.status.balance_transfer');
                    break;
                default:
                    color = '';
                    actionName = '--';
            }
            return {
                color,
                actionName
            }
        },
        orderSourceText(type) {
            if(!type) {
                return 
            }
            let str = '';
            switch(parseInt(type)) {
                case 1:
                str = 'KOLO HOUSE';
                break;
                case 2: 
                str = 'APP';
                break;
                case 3:
                str = 'H5';
                break;
                case 4:
                str = '小程序';
                break;
            }
            return str;
        },

        country(val) { // 区
            if (val) {
                locations({ parentCode: val }).then(res => {
                    if (res.data.code === 0) {
                        this.countyList = res.data.data;
                    }
                });
            } else {
                this.countyList = [];
            }
            this.form.locationCode = val;
            this.search();
        },

        /**
         * @desc 获取字符串字符长度
         * @param {String} str - 字符串
         */
        getStrLength(str) {
            let realLength = 0;
            let len = str.length;
            let charCode = -1;
            for (let i = 0; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) realLength += 1;
                else realLength += 2;
            }
            return realLength;
        },
        validateStatus() {
            if (this.$refs.form) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.errorStatus = false;
                    } else {
                        this.errorStatus = true;
                    }
                });
            }
        },
        routerPush(path, id) {
            this.$router.push({ path: `${path}/${id}` });
        },
        arrayFeatch(array, key, val, other) {
            let result;
            array.map(
                item => {
                    if (item[key] === val) {
                        result = item[other];
                    }
                }
            );
            return result;
        },

    }
};