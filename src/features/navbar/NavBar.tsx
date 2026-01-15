import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { startTeleprompter, stopTeleprompter, changeLanguage } from "../../app/thunks"

import {
  toggleEdit,
  flipHorizontally,
  flipVertically,
  setFontSize,
  setMargin,
  setOpacity,
  setScrollOffset,
  setLanguage,
  selectStatus,
  selectHorizontallyFlipped,
  selectVerticallyFlipped,
  selectFontSize,
  selectMargin,
  selectOpacity,
  selectScrollOffset,
  selectLanguage,
  SUPPORTED_LOCALES,
} from "./navbarSlice"

import { resetTranscriptionIndices } from "../content/contentSlice"

export const NavBar = () => {
  const dispatch = useAppDispatch()

  const status = useAppSelector(selectStatus)
  const fontSize = useAppSelector(selectFontSize)
  const margin = useAppSelector(selectMargin)
  const opacity = useAppSelector(selectOpacity)
  const scrollOffset = useAppSelector(selectScrollOffset)
  const horizontallyFlipped = useAppSelector(selectHorizontallyFlipped)
  const verticallyFlipped = useAppSelector(selectVerticallyFlipped)
  const language = useAppSelector(selectLanguage)

  return (
    <nav
      className="navbar is-black has-text-light is-unselectable"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu is-active">
        <div className="navbar-end">
          {status === "stopped" ? (
            <>
              <div className="navbar-item slider">
                <span>Font size:</span>
                <input
                  type="range"
                  step="5"
                  min="10"
                  max="200"
                  value={fontSize}
                  onChange={e =>
                    dispatch(setFontSize(parseInt(e.currentTarget.value, 10)))
                  }
                />
              </div>
              <div className="navbar-item slider">
                <span>Margin:</span>
                <input
                  type="range"
                  step="10"
                  min="0"
                  max="500"
                  value={margin}
                  onChange={e =>
                    dispatch(setMargin(parseInt(e.currentTarget.value, 10)))
                  }
                />
              </div>
            </>
          ) : null}

          <div className="buttons navbar-item">
            {status !== "started" ? (
              <>
                <button
                  className={`button ${status === "editing" ? "editing" : ""}`}
                  onClick={() => dispatch(toggleEdit())}
                  title="Edit"
                >
                  <span className="icon is-small">
                    <i className="fa-solid fa-pencil" />
                  </span>
                </button>
                <button
                  className={`button ${horizontallyFlipped ? "horizontally-flipped" : ""}`}
                  disabled={status !== "stopped"}
                  onClick={() => dispatch(flipHorizontally())}
                  title="Flip Text Horizontally"
                >
                  <span className="icon is-small">
                    <i className="fa-solid fa-left-right" />
                  </span>
                </button>
                <button
                  className={`button ${verticallyFlipped ? "vertically-flipped" : ""}`}
                  disabled={status !== "stopped"}
                  onClick={() => dispatch(flipVertically())}
                  title="Flip Text Vertically"
                >
                  <span className="icon is-small">
                    <i className="fa-solid fa-up-down" />
                  </span>
                </button>
                <button
                  className="button"
                  disabled={status !== "stopped"}
                  onClick={() => dispatch(resetTranscriptionIndices())}
                  title="Restart from the beginning"
                >
                  <span className="icon is-small">
                    <i className="fa-solid fa-arrows-rotate" />
                  </span>
                </button>
              </>
            ) : null}

            <button
              className="button"
              disabled={status === "editing"}
              onClick={() =>
                dispatch(
                  status === "stopped" ? startTeleprompter() : stopTeleprompter(),
                )
              }
              title={
                status === "stopped" || status === "editing" ? "Start" : "Stop"
              }
            >
              <span className="icon is-small">
                <i
                  className={`fa-solid ${status === "stopped" || status === "editing" ? "fa-play" : "fa-stop"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
