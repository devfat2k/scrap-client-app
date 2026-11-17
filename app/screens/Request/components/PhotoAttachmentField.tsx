import { useRef, useState } from "react"
import { ActivityIndicator, Image, Keyboard, Pressable, View } from "react-native"

import { FieldLabel } from "@/components/FormField"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { pickImages, takePhoto, type PickerResult, type ProcessedAsset } from "@/services/camera"
import { useAppTheme } from "@/theme/context"
import { showToast } from "@/utils/toastService"

import { PHOTO_ERROR_TX } from "./photoErrorMessages"
import { showPermissionAlert, type PhotoSource } from "./photoPermissionAlert"
import { PhotoSourceSheet } from "./PhotoSourceSheet"
import { MAX_REQUEST_PHOTOS } from "../form/requestFormTypes"
import { styles } from "../styles/createRequestStyles"

export interface PhotoAttachmentFieldProps {
  /**
   * Photos already attached to the scrap item.
   */
  photos: ProcessedAsset[]
  /**
   * Called with the next list of photos after adding or removing.
   */
  onChange: (photos: ProcessedAsset[]) => void
  /**
   * Maximum number of photos allowed.
   */
  maxPhotos?: number
  /**
   * Prevents adding or removing photos.
   */
  disabled?: boolean
}

/**
 * Photo grid with add/remove controls for a single scrap item.
 */
export function PhotoAttachmentField(props: PhotoAttachmentFieldProps) {
  const { photos, onChange, maxPhotos = MAX_REQUEST_PHOTOS, disabled = false } = props
  const { themed, theme } = useAppTheme()
  const [isSheetVisible, setIsSheetVisible] = useState(false)
  const [isPicking, setIsPicking] = useState(false)
  const pendingSourceRef = useRef<PhotoSource | null>(null)
  const isPickingRef = useRef(false)

  const remaining = Math.max(0, maxPhotos - photos.length)
  const canAdd = !disabled && !isPicking && remaining > 0
  const label = `${translate("request:photosLabel")} (${photos.length}/${maxPhotos})`

  function handlePickerResult(result: PickerResult, source: PhotoSource) {
    if (result.canceled) return

    if ("errorCode" in result) {
      if (result.errorCode === "permission_denied") {
        showPermissionAlert(source, result.canAskAgain)
        return
      }

      showToast({ message: translate(PHOTO_ERROR_TX[result.errorCode]), type: "ERROR" })
      return
    }

    onChange([...photos, ...result.assets].slice(0, maxPhotos))
  }

  async function runPick(source: PhotoSource) {
    if (isPickingRef.current) return

    isPickingRef.current = true
    setIsPicking(true)
    try {
      const result = source === "camera" ? await takePhoto() : await pickImages(remaining)
      handlePickerResult(result, source)
    } catch {
      showToast({ message: translate("request:photoErrors.generic"), type: "ERROR" })
    } finally {
      isPickingRef.current = false
      setIsPicking(false)
    }
  }

  /** Clears any stale source before opening the sheet again. */
  function openSheet() {
    if (!canAdd) return

    // Blur the active input first so the keyboard slides down together with
    // the sheet, and it does not pop back up when the sheet closes.
    Keyboard.dismiss()
    pendingSourceRef.current = null
    setIsSheetVisible(true)
  }

  /** Remembers the source and closes the sheet; the picker runs once it is dismissed. */
  function pickSource(source: PhotoSource) {
    if (!isSheetVisible || isPickingRef.current) return

    pendingSourceRef.current = source
    setIsSheetVisible(false)
  }

  function handleSheetClose() {
    setIsSheetVisible(false)

    const source = pendingSourceRef.current
    pendingSourceRef.current = null

    if (source) void runPick(source)
  }

  function removePhoto(index: number) {
    onChange(photos.filter((_, photoIndex) => photoIndex !== index))
  }

  return (
    <View>
      <FieldLabel label={label} />

      <View style={themed(styles.$photoGrid)}>
        {photos.map((photo, index) => (
          <View key={`${photo.uri}-${index}`} style={themed(styles.$photoThumb)}>
            <Image source={{ uri: photo.uri }} style={styles.$photoThumbImage} resizeMode="cover" />
            <Pressable
              onPress={() => removePhoto(index)}
              disabled={disabled}
              hitSlop={theme.spacing.xs}
              accessibilityRole="button"
              accessibilityLabel={translate("request:removePhoto")}
              style={themed(styles.$photoRemoveButton)}
            >
              <SvgIcon icon="Close" size={14} fill={theme.colors.palette.neutral100} />
            </Pressable>
          </View>
        ))}

        {remaining > 0 && (
          <Pressable
            onPress={openSheet}
            disabled={!canAdd}
            accessibilityRole="button"
            accessibilityLabel={translate("request:addPhoto")}
            accessibilityState={{ disabled: !canAdd }}
            style={({ pressed }) => [
              themed(styles.$photoAddTile),
              !canAdd && themed(styles.$photoAddTileDisabled),
              pressed && canAdd && themed(styles.$fieldSurfacePressed),
            ]}
          >
            {isPicking ? (
              <ActivityIndicator size="small" color={theme.colors.textDim} />
            ) : (
              <Text preset="heading" text="+" style={themed(styles.$photoAddIcon)} />
            )}
          </Pressable>
        )}
      </View>

      <Text
        preset="formHelper"
        tx="request:photosHelper"
        txOptions={{ count: maxPhotos }}
        style={themed(styles.$photoHelper)}
      />

      <PhotoSourceSheet
        visible={isSheetVisible}
        onClose={handleSheetClose}
        onTakePhoto={() => pickSource("camera")}
        onChooseLibrary={() => pickSource("library")}
        disabled={isPicking}
      />
    </View>
  )
}
