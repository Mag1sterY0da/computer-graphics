import React from "react";
import PropTypes from "prop-types";

export default function RotationSection({ pref, addValue }) {
  RotationSection.propTypes = {
    pref: PropTypes.object,
    addValue: PropTypes.func,
  };

  return (
    <fieldset className="field__rotation">
      <legend>Rotation</legend>
      <div>
        <label htmlFor="rot_x">X:</label>
        <input
          className="input--num"
          id="rot_x"
          type="number"
          value={pref.rot.x}
          onChange={(e) => addValue({ x: +e.target.value }, "rot")}
        />
      </div>
      <div>
        <label htmlFor="rot_y">Y:</label>
        <input
          className="input--num"
          id="rot_y"
          type="number"
          value={pref.rot.y}
          onChange={(e) => addValue({ y: +e.target.value }, "rot")}
        />
      </div>
      <div>
        <label htmlFor="rot_angle">Angle:</label>
        <input
          className="input--num"
          id="rot_angle"
          type="number"
          value={pref.rot.angle}
          onChange={(e) => addValue({ angle: +e.target.value }, "rot")}
        />
      </div>
    </fieldset>
  );
}
