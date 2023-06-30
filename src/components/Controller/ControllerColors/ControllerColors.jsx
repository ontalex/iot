import React, { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";

export default function ControllerColors(props) {
    let { device, activity } = props;

    let rgbToHsv = (red, green, blue) => {
        // Нормализуем значения RGB в диапазоне от 0 до 1
        let r = red / 255;
        let g = green / 255;
        let b = blue / 255;

        // Вычисляем максимальное и минимальное значение цвета
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);

        // Вычисляем разницу между максимальным и минимальным значением
        let delta = max - min;

        // Вычисляем значение (Value)
        let value = max;

        // Если все значения равны, то оттенок и насыщенность будут нулевыми
        if (delta === 0) {
            return [0, 0, value];
        }

        // Вычисляем насыщенность (Saturation)
        let saturation = delta / max;

        // Вычисляем оттенок (Hue)
        let hue;

        switch (max) {
            case r:
                hue = ((g - b) / delta) % 6;
                break;
            case g:
                hue = (b - r) / delta + 2;
                break;
            case b:
                hue = (r - g) / delta + 4;
                break;
            default:
                break;
        }
        hue = Math.round(hue * 60);
        if (hue < 0) {
            hue += 360;
        }

        // console.log([hue, saturation, hsv[2]]);
        console.log({ h: hue, s: saturation*360, v: hsv.v });
        setHsv({ h: hue, s: Math.round(saturation*100), v: hsv.v });
    };

    let sendColor = (value) => {
        console.log(value);
        fetch("https://api.iot.yandex.net/v1.0/devices/actions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({
                devices: [
                    {
                        id: device.id,
                        actions: [
                            {
                                type: "devices.capabilities.color_setting",
                                state: {
                                    instance: "hsv",
                                    value: value,
                                },
                            },
                        ],
                    },
                ],
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`${res.status}, ${res.statusText}`);
                }
            })
            .then((res) => {
                console.log("Res From API (device)", res);
                console.log("IS ON DEVICE", this.state.isOn);
            });
    };

    console.log(activity);

    let [rangeValueRed, setRangeValueRed] = useState([50]);
    let [rangeValueGreen, setRangeValueGreen] = useState([50]);
    let [rangeValueBlue, setRangeValueBlue] = useState([50]);

    let [hsv, setHsv] = useState({
        h: activity.state.value.h || 50,
        s: activity.state.value.s || 50,
        v: device.capabilities.find(
            (item) => item.type === "devices.capabilities.range"
        ).state.value,
    });

    useEffect(() => {
        rgbToHsv(rangeValueRed, rangeValueGreen, rangeValueBlue);
    }, [rangeValueRed, rangeValueGreen, rangeValueBlue]);

    const STEP = 1;
    const MIN = 0;
    const MAX = 255;

    return (
        <div className="controller_colors">

            <div
                className="controller_box"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "2em",
                }}
            >
                <Range
                    values={rangeValueRed}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setRangeValueRed(values)}
                    onBlur={() =>
                        rgbToHsv(rangeValueRed, rangeValueGreen, rangeValueBlue)
                    }
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "min-content",
                                display: "flex",
                                width: "100%",
                                background: "#0000",
                                padding: "16px",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "36px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: rangeValueRed,
                                        colors: ["#f00", "#fff"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "16px",
                                    borderRadius: "16px",
                                    backgroundColor: isDragged
                                        ? "#f00"
                                        : "#CCC",
                                }}
                            />
                        </div>
                    )}
                />
            </div>

            <div
                className="controller_box"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "2em",
                }}
            >
                <Range
                    values={rangeValueGreen}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setRangeValueGreen(values)}
                    onBlur={() =>
                        rgbToHsv(rangeValueRed, rangeValueGreen, rangeValueBlue)
                    }
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "min-content",
                                display: "flex",
                                width: "100%",
                                background: "#0000",
                                padding: "16px",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "36px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: rangeValueGreen,
                                        colors: ["#0f0", "#fff"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "16px",
                                    borderRadius: "16px",
                                    backgroundColor: isDragged
                                        ? "#0f0"
                                        : "#CCC",
                                }}
                            />
                        </div>
                    )}
                />
            </div>

            <div
                className="controller_box"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "2em",
                }}
            >
                <Range
                    values={rangeValueBlue}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setRangeValueBlue(values)}
                    onBlur={() =>
                        rgbToHsv(rangeValueRed, rangeValueGreen, rangeValueBlue)
                    }
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "min-content",
                                display: "flex",
                                width: "100%",
                                background: "#0000",
                                padding: "16px",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "36px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: rangeValueBlue,
                                        colors: ["#00f", "#fff"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "16px",
                                    borderRadius: "16px",
                                    backgroundColor: isDragged
                                        ? "#00f"
                                        : "#CCC",
                                }}
                            />
                        </div>
                    )}
                />
            </div>

            <button className="colors_btn" onClick={()=>sendColor(hsv)}>
                <span>Подтвердить</span>
            </button>
            
        </div>
    );
}
