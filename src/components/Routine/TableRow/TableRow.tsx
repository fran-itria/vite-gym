/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableRowComponentProps } from "../../../types";
import ModalAddLoad from "./ModalAddLoad";
import useTabelRow from "../../../hook/Components/useTableRow";
import TableCell from "./TableCell";
import ConfirmDelete from "./ConfirmDelete";
import ModifiedExercise from "./ModifiedExercise";
import { modifiedLoads } from "../../../services/routine/exercises/modifiedExercise";
import { Modal } from "@mui/material";

export default function TableRow({
  id,
  name,
  series,
  reps,
  link,
  Loads,
  routineOrWarmUp,
  setLoader,
  setRoutineAdmin,
  caseResolve,
}: TableRowComponentProps) {
  const {
    open,
    setOpen,
    confirmDelete,
    setConfirmDelete,
    openLoad,
    setOpenLoad,
    idLoad,
    setIdLoad,
    load,
    setLoad,
    newLoads,
    setNewLoads,
    weekLoad,
    setWeekLoad,
  } = useTabelRow();
  const { routineActual, routineId, weeks } = routineOrWarmUp;

  return (
    <tr>
      <TableCell
        key={id}
        weeks={weeks ? weeks : undefined}
        id={id}
        Loads={Loads ? Loads : undefined}
        series={series}
        reps={reps}
        link={link}
        name={name}
        setOpenLoad={setOpenLoad}
        setConfirmDelete={setConfirmDelete}
        setOpen={setOpen}
        setLoad={setLoad}
        setIdLoad={setIdLoad}
        setWeekLoad={setWeekLoad}
        setRoutineAdmin={setRoutineAdmin}
      />
      <Modal open={open || openLoad || confirmDelete}>
        <>
          {open ? (
            <ModifiedExercise
              id={id}
              name={name}
              series={series}
              reps={reps}
              link={link}
              setOpen={setOpen}
              routineOrWarmUp={{ routineActual, routineId }}
              setLoader={setLoader}
              setRoutineAdmin={setRoutineAdmin}
              caseResolve={caseResolve}
            />
          ) : (
            <></>
          )}
          {openLoad ? (
            <ModalAddLoad
              key={id}
              id={id}
              setOpenLoad={setOpenLoad}
              setLoader={setLoader}
              weekLoad={weekLoad}
              routineOrWarmUp={{ routineActual, routineId }}
            />
          ) : (
            <></>
          )}
          {confirmDelete ? (
            <ConfirmDelete
              key={id}
              name={name}
              id={id}
              setConfirmDelete={setConfirmDelete}
              routineActual={routineActual}
              routineId={routineId}
              setLoader={setLoader}
              setRoutineAdmin={setRoutineAdmin}
              caseResolve={caseResolve}
            />
          ) : (
            <></>
          )}
        </>
      </Modal>
      {load ? (
        <div>
          <label>
            Carga:
            <input
              type="text"
              onChange={(e) => setNewLoads(e.target.value)}
            ></input>
          </label>
          <button
            onClick={() =>
              modifiedLoads({
                id: idLoad,
                load: newLoads,
                routineActual,
                routineId,
                setLoad,
                setLoader,
              })
            }
          >
            Guardar
          </button>
          <button onClick={() => setLoad(!load)}>Cancelar</button>
        </div>
      ) : (
        <></>
      )}
    </tr>
  );
}
