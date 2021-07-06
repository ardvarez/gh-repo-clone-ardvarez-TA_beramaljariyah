/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import swal from "sweetalert";

import Submit from "../buttons/Submit";
import BackIcon from "../../assets/arrow-back.png";

function EditCard(props) {
  const navigate = useHistory();
  const { user } = props;

  const [profile, setProfile] = useState({
    username: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.description,
  });

  const onSubmit = () => {
    swal("Success", "Data anda telah diubah", "success").then(() =>
      navigate.push("/")
    );
  };

  return (
    <div className="w-80 transaction-wrapper p-4 d-flex flex-column align-items-center">
      <div className="w-100 d-flex justify-content-center align-items-center">
        <img
          src={BackIcon}
          alt="Back"
          style={{ position: "absolute", top: 24, left: 24, cursor: "pointer" }}
          onClick={() => navigate.goBack()}
        />
        <span style={{ fontWeight: "bolder", fontSize: 24 }}>Edit Profile</span>
      </div>
      <Form className="mt-3" style={{ width: "90%" }}>
        <Form.Row className="d-flex flex-column align-items-start mt-2">
          <Form.Label>
            <span style={{ fontWeight: "bolder", fontSize: 24 }}>Email</span>
          </Form.Label>
          <Form.Control
            name="username"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column align-items-start mt-2">
          <Form.Label>
            <span style={{ fontWeight: "bolder", fontSize: 24 }}>Username</span>
          </Form.Label>
          <Form.Control
            name="username"
            value={profile.username}
            onChange={(e) =>
              setProfile({
                ...profile,
                username: e.target.value,
              })
            }
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column align-items-start mt-2">
          <Form.Label>
            <span style={{ fontWeight: "bolder", fontSize: 24 }}>No. HP</span>
          </Form.Label>
          <Form.Control
            name="username"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone: e.target.value,
              })
            }
          />
        </Form.Row>
        <Form.Row className="d-flex flex-column align-items-start mt-2">
          <Form.Label>
            <span style={{ fontWeight: "bolder", fontSize: 24 }}>
              Bio Singkat
            </span>
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Tulis Tentang Diri Anda"
            style={{ height: 80 }}
            value={profile.bio}
            onChange={(e) => {
              setProfile({
                ...profile,
                bio: e.target.value,
              });
            }}
          />
        </Form.Row>
      </Form>
      <Submit title="Simpan" onClick={() => onSubmit()} />
    </div>
  );
}

export default EditCard;
