import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import router from "./router";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";

import Aura from "@primevue/themes/aura";

import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Message from "primevue/message";
import Password from "primevue/password";
import RadioButton from "primevue/radiobutton";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import DatePicker from "primevue/datepicker";
import AutoComplete from "primevue/autocomplete";
import InputNumber from "primevue/inputnumber";
import Tag from "primevue/tag";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import ProgressBar from "primevue/progressbar";
import Editor from "primevue/editor";
import FileUpload from "primevue/fileupload";
import TieredMenu from "primevue/tieredmenu";
import Skeleton from "primevue/skeleton";
import Paginator from "primevue/paginator";
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Galleria from "primevue/galleria";
import Select from "primevue/select";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia());

app.component("InputText", InputText);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("Message", Message);
app.component("Password", Password);
app.component("RadioButton", RadioButton);
app.component("Textarea", Textarea);
app.component("Dialog", Dialog);
app.component("DatePicker", DatePicker);
app.component("AutoComplete", AutoComplete);
app.component("InputNumber", InputNumber);
app.component("Tag", Tag);
app.component("Checkbox", Checkbox);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Tabs", Tabs);
app.component("TabList", TabList);
app.component("Tab", Tab);
app.component("TabPanels", TabPanels);
app.component("TabPanel", TabPanel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("ProgressBar", ProgressBar);
app.component("Editor", Editor);
app.component("FileUpload", FileUpload);
app.component("TieredMenu", TieredMenu);
app.component("Skeleton", Skeleton);
app.component("Paginator", Paginator);
app.component("Stepper", Stepper);
app.component("StepList", StepList);
app.component("StepPanels", StepPanels);
app.component("StepItem", StepItem);
app.component("Step", Step);
app.component("StepPanel", StepPanel);
app.component("Galleria", Galleria);
app.component("Select", Select);

app.mount("#app");
