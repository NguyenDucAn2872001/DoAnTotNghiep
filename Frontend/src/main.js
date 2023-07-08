import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import router from './router'
import { registerLicense } from '@syncfusion/ej2-base';
import store from '../src/store/index'
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'chart.js'


const app = createApp(App)
registerLicense('License Key :Mgo+DSMBaFt+QHFqUUdrWU5GcUBAXWFKblJ2T2FYdV5zZCQ7a15RRnVfRl9kSH5QckFjUHZfdw==;Mgo+DSMBPh8sVXJ1S0d+WFBPc0BAWnxLflF1VWJZdVxxflVFcC0sT3RfQF5jTXxUd0VgXXtfcHRdQQ==;ORg4AjUWIQA/Gnt2VFhhQlVFfVpdX2RWfFN0RnNYf1RydV9GY0wgOX1dQl9gSXpRcURjWntacXRXRWc=;MTg2MDcwMkAzMjMxMmUzMTJlMzQzMUY4VklZKzk4akR5WTRZbWhpVkZOMGdLZlZxcVRSOUIyaVlkeFZNckI1VDg9;MTg2MDcwM0AzMjMxMmUzMTJlMzQzMVQ3T0lHUkhKVEdhM3VhcGxuVE9WR2M0dEdnaXh2bjRWeWluVHNHTkxnalk9;NRAiBiAaIQQuGjN/V0d+XU9Ad1RHQmFOYVF2R2BJfl56dlRMYF9BNQtUQF1hSn5XdEJiWXxadHVVTmVb;MTg2MDcwNUAzMjMxMmUzMTJlMzQzMUhPbVZBZ2g2Rm01NWt6YUF3MUVYekJNWGpBM2lwTlZmd3VXVVRZSlROSU09;MTg2MDcwNkAzMjMxMmUzMTJlMzQzMWd3aVBmaDVSdHFkTU9BSXlwSlllZVVtWTQ5eTdsbXVXbW5aazFJSjRKK0E9;Mgo+DSMBMAY9C3t2VFhhQlVFfVpdX2RWfFN0RnNYf1RydV9GY0wgOX1dQl9gSXpRcURjWntacXZVR2c=;MTg2MDcwOEAzMjMxMmUzMTJlMzQzMWNHelJYekhkUmVaZGszVzdLeDRDVGgvVldQbFFxMVhnRDhPYkdRY1ptV0k9;MTg2MDcwOUAzMjMxMmUzMTJlMzQzMWZ4UEFRelhQTGZyWE5aMFdZVVFLYzY0ek9YTVBGcmxwRGlmcFFOVkZQSGs9;MTg2MDcxMEAzMjMxMmUzMTJlMzQzMUhPbVZBZ2g2Rm01NWt6YUF3MUVYekJNWGpBM2lwTlZmd3VXVVRZSlROSU12 ');
app.use(store)
app.use(ElementPlus)
app.use(router)
app.use(Vuex);
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
