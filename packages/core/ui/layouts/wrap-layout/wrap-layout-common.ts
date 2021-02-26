﻿import { WrapLayout as WrapLayoutDefinition } from '.';
import { LayoutBase } from '../layout-base';
import { CSSType } from '../../core/view';
import { Property, makeValidator, makeParser } from '../../core/properties';
import { Length, LengthType } from '../../styling/style-properties';
import { Enums } from '../../enums';

export * from '../layout-base';

@CSSType('WrapLayout')
export class WrapLayoutBase extends LayoutBase implements WrapLayoutDefinition {
	public orientation: Enums.OrientationType;
	public itemWidth: LengthType;
	public itemHeight: LengthType;
	public effectiveItemWidth: number;
	public effectiveItemHeight: number;
}

WrapLayoutBase.prototype.recycleNativeView = 'auto';

export const itemWidthProperty = new Property<WrapLayoutBase, LengthType>({
	name: 'itemWidth',
	defaultValue: 'auto',
	affectsLayout: global.isIOS,
	valueConverter: (v) => Length.parse(v),
	valueChanged: (target, oldValue, newValue) => (target.effectiveItemWidth = Length.toDevicePixels(newValue, -1)),
});
itemWidthProperty.register(WrapLayoutBase);

export const itemHeightProperty = new Property<WrapLayoutBase, LengthType>({
	name: 'itemHeight',
	defaultValue: 'auto',
	affectsLayout: global.isIOS,
	valueConverter: (v) => Length.parse(v),
	valueChanged: (target, oldValue, newValue) => (target.effectiveItemHeight = Length.toDevicePixels(newValue, -1)),
});
itemHeightProperty.register(WrapLayoutBase);

const converter = makeParser<Enums.OrientationType>(makeValidator<Enums.OrientationType>(Enums.Orientation.horizontal, Enums.Orientation.vertical));
export const orientationProperty = new Property<WrapLayoutBase, Enums.OrientationType>({
	name: 'orientation',
	defaultValue: Enums.Orientation.horizontal,
	affectsLayout: global.isIOS,
	valueConverter: converter,
});
orientationProperty.register(WrapLayoutBase);
