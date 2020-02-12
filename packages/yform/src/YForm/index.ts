import { Form as AntForm } from 'antd';
import YForm, { Config, useFormatFieldsValue } from './Form';
import Items from './Items';

import './index.less';

type InternalYForm = typeof YForm;
interface RefYForm extends InternalYForm {
  Config: typeof Config;
  Items: typeof Items;
  Item: typeof AntForm.Item;
  useForm: typeof AntForm.useForm;
  useFormatFieldsValue: typeof useFormatFieldsValue;
}

const Form: RefYForm = YForm as RefYForm;

Form.Config = Config;
Form.Items = Items;
Form.Item = AntForm.Item;
Form.useForm = AntForm.useForm;
Form.useFormatFieldsValue = useFormatFieldsValue;

export default Form;
