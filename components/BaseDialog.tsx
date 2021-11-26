import styles from "../styles/BaseDialog.module.scss";
import useToggleAlert from "../hooks/useToggleAlert";
import PropTypes from "prop-types";
import SettingsDialog from "../components/SettingsDialog";
import { Fragment } from "react";

const BaseDialog = (props: {
  onOpenDialog: any;
  subtitle: string;
  summary: string;
  title: string;
  AmountInputA?: any;
  AmountInputB?: any;
  BaseButton: any;
  SelectCurrencyA?: any;
  SelectCurrencyB?: any;
}) => {
  const {
    onOpenDialog,
    subtitle,
    summary,
    title,
    AmountInputA,
    AmountInputB,
    BaseButton,
    SelectCurrencyA,
    SelectCurrencyB,
  } = props;
  const [isOpened, setIsOpened] = useToggleAlert(onOpenDialog);
  const [isOpenedSettingsDialog, setIsOpenedSettingsDialog] =
    useToggleAlert(false);

  return (
    <div>
      {isOpened && (
        <div className={styles.backdrop}>
          <div className={styles.dialog}>
            <div className={styles.menu}>
              <a
                href="#modal-closed"
                className={styles.link_to_close_dialog}
                onClick={() => setIsOpened(false)}
              ></a>
            </div>
            <div className={styles.header}>
              <h2>{title}</h2>
            </div>
            <span className={styles.subtitle}>{subtitle}</span>
            <section>
              {AmountInputA}
              {SelectCurrencyA}
              {AmountInputB}
              {SelectCurrencyB}
              <p>{summary}</p>
              <div className={styles.button} onClick={() => setIsOpened(false)}>
                {BaseButton}
              </div>
            </section>
            <Fragment>
              <button onClick={setIsOpenedSettingsDialog}>Settings</button>
              {isOpenedSettingsDialog && (
                <SettingsDialog
                  onOpenSettingsDialog={isOpenedSettingsDialog}
                  subtitle="Align your Transaction Settings"
                  title="Settings"
                />
              )}
            </Fragment>
          </div>
        </div>
      )}
    </div>
  );
};

BaseDialog.propTypes = {
  onOpenDialog: PropTypes.func.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  AmountInputA: PropTypes.object,
  AmountInputB: PropTypes.object,
  BaseButton: PropTypes.object,
  SelectCurrencyA: PropTypes.object,
  SelectCurrencyB: PropTypes.object,
};

export default BaseDialog;
