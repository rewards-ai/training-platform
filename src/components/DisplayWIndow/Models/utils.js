import Swal from "sweetalert2/src/sweetalert2"
import axios from "axios";
import "@sweetalert2/theme-dark"

const rewards_api = axios.create({baseURL: import.meta.env.VITE_REWARDS_API})

export const getList = async (setCurExp, setExpList) => {
    await rewards_api.get(`/get_all_sessions`)
    .then((response) => {
      console.log("at all sessions", response);
      let session_ids = Object.keys(response.data)
      let data = []
      session_ids.map((e) => {
        data.push({
          "session_id": e,
          "environment_name": response.data[e]["env_params"]["environment_name"],
          "environment_world": response.data[e]["env_params"]["environment_world"],
          "learning_algorithm": response.data[e]["training_params"]["learning_algorithm"]
        })
      })
      setExpList(data)
      setCurExp(0)
    })
    .catch((error) => {
      console.error(error);
    });
  }

const handleDelete = async (setCurExp, setExpList, exp) => {
    try {
        rewards_api.post(`/delete_session?session_id=${exp["session_id"]}`)
        .then(() => getList(setCurExp, setExpList))
        Swal.fire({
            icon: 'success',
            text: 'Experiment has been deleted successfully!',
            timer: 3000,
            showConfirmButton: false
        });
    } catch (err) {
        console.log(err)
        Swal.fire({
            icon: 'error',
            text: 'Error deleting session',
            timer: 3000,
            showConfirmButton: false
        });
    }
};

export const deleteSession = (setCurExp, setExpList, exp) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this experiment!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
    }).then((result) => {
            if (result.isConfirmed) {
            handleDelete(setCurExp, setExpList, exp);
        }
    });
}

export const handlePush = async (session_id, user_id, user) => {
  let data = {session_id, user_id, user}
  console.log("checking", data)
  await rewards_api.post("/push_model", data)
  .then((response) => {
    console.log(response)
  })
}