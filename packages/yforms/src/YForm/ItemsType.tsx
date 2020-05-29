import React from 'react';
import { Input, Checkbox, Switch, Button, DatePicker } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import { InputProps, PasswordProps } from 'antd/lib/input';
import { SwitchProps } from 'antd/lib/switch';
import { ButtonProps } from 'antd/lib/button';
import { CheckboxProps } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker';

import { YFormItemProps, YFormItemsProps } from './Items';
import { searchSelect } from './utils';
import CustomTypography from './component/Typography';
import OneLine, {
  YFormOneLineComponentProps,
  YFormOneLineProps,
  oneLineModify,
} from './component/OneLine';
import Radio, { YRadioProps } from './component/Radio';
import List, { YFormListComponentProps, YFormListProps } from './component/List';
import CheckboxGroup, { YCheckGroupProps } from './component/CheckboxGroup';
import Select, { YSelectProps } from './component/Select';
import TextArea, { YTextAreaProps, textModify } from './component/TextArea';
import Money, { YMoneyProps } from './component/Money';
import Submit, { YFormSubmitProps, submitModify } from './component/Submit';
import SecureButton, { YFormSecureButtonProps } from './component/SecureButton';
import { YFormProps, YFormConfig } from './Form';
import ComponentView from './component/ComponentView';
import { datePicker } from './ItemsTypeModify';

export interface YFormFieldBaseProps<T = any> {
  component?: React.ReactElement;
  type?: string;
  formItemProps?: YFormItemProps;
  formatStr?: string;
  hasFormItem?: boolean;
  scenes?: YFormConfig['scenes'];
  modifyProps?: (
    props: Required<modifyType<T>>,
  ) => Pick<modifyType<T>, 'itemProps' | 'componentProps'>;
  componentView?: React.ReactElement;
  viewProps?: { format?: (value: any) => React.ReactNode };
  diffProps?: any;
}

export type modifyType<T = any> = {
  formProps?: YFormProps;
  itemsProps?: YFormItemsProps;
  itemProps?: YFormItemProps;
  componentProps?: T;
  typeProps?: YFormFieldBaseProps<T>;
};

export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export type stringAndFunc<T> = string | ((record: T, index: number) => React.ReactNode);

export interface OptionsProps<T = any> {
  options?: {
    id?: React.ReactNode;
    name?: CheckboxValueType;
    disabled?: boolean;
  }[];
  postField?: stringAndFunc<T>;
  showField?: stringAndFunc<T>;
  renderOption?: (item: any) => any;
  onAddProps?: (item: T, index: number) => { disabled?: boolean; [key: string]: React.ReactNode };
}

export interface YFormItemsTypeDefine {
  // 字段类型
  input: { componentProps?: InputProps };
  view: { componentProps?: any };
  datePicker: { componentProps?: DatePickerProps };
  rangePicker: { componentProps?: RangePickerProps };
  password: { componentProps?: PasswordProps };
  textarea: { componentProps?: YTextAreaProps };
  money: { componentProps?: YMoneyProps };
  checkbox: { componentProps?: CheckboxProps };
  switch: { componentProps?: SwitchProps };
  checkboxGroup: { componentProps?: YCheckGroupProps };
  select: { componentProps?: YSelectProps };
  radio: { componentProps?: YRadioProps };
  text: { componentProps?: TextProps };
  // 展示类型
  button: { componentProps?: ButtonProps };
  // 其它功能类型
  oneLine: { componentProps?: YFormOneLineComponentProps; items?: YFormOneLineProps['items'] };
  list: { componentProps?: YFormListComponentProps; items?: YFormListProps['items'] };
  custom: { componentProps?: any; component?: React.ReactNode };
  submit: { componentProps?: YFormSubmitProps };
  secureButton: { componentProps?: YFormSecureButtonProps };
}

export type YFormItemsType<T = YFormFieldBaseProps> = {
  [P in keyof YFormItemsTypeDefine]?: { type?: P } & YFormItemsTypeDefine[P] & T;
};

const checkboxProps: YFormFieldBaseProps<CheckboxProps>['modifyProps'] = ({ itemProps }) => {
  return { itemProps: { valuePropName: 'checked', ...itemProps } };
};

const switchProps: YFormFieldBaseProps<SwitchProps>['modifyProps'] = ({ itemProps }) => {
  return { itemProps: { valuePropName: 'checked', ...itemProps } };
};
export type YFormItemsTypeArray<T> = YFormItemsType<T>[keyof YFormItemsType];

export const itemsType: YFormItemsType = {
  // viewProps: { valueType: 'string' },
  input: { component: <Input />, formatStr: '请输入${label}' },
  datePicker: { component: <DatePicker />, formatStr: '请选择${label}', modifyProps: datePicker },
  rangePicker: { component: <DatePicker.RangePicker />, formatStr: '请选择${label}' },
  password: { component: <Input.Password />, formatStr: '请输入${label}' },
  textarea: { component: <TextArea />, formatStr: '请输入${label}', modifyProps: textModify },
  money: { component: <Money />, formatStr: '请输入${label}' },
  checkbox: { component: <Checkbox />, formatStr: '请选择${label}', modifyProps: checkboxProps },
  switch: { component: <Switch />, formatStr: '请选择${label}', modifyProps: switchProps },
  checkboxGroup: { component: <CheckboxGroup />, formatStr: '请选择${label}' },
  radio: { component: <Radio />, formatStr: '请选择${label}' },
  select: { component: <Select {...searchSelect} />, formatStr: '请选择${label}' },
  text: { component: <CustomTypography />, formatStr: '请输入${label}' },
  oneLine: { component: <OneLine />, modifyProps: oneLineModify },
  list: { component: <List />, hasFormItem: false },
  button: { component: <Button /> },
  secureButton: { component: <SecureButton /> },
  custom: {},
  submit: { component: <Submit />, hasFormItem: false, modifyProps: submitModify },
  view: { component: <ComponentView /> },
};

export default itemsType;
