
export interface DocMemberEntry {
    userid?: string;
    partyid?: string;
    tagid?: string;
    /**
     * 权限位：1-查看，2-编辑，7-管理
     */
    auth?: number;
    type?: number; // 1:用户, 2:部门
    tmp_external_userid?: string;
}

export interface Node {
    begin: number;
    end: number;
    property: Property;
    type: NodeType;
    children: Node[];
    text?: string;
}

export enum NodeType {
    Document = "Document",
    MainStory = "MainStory",
    Section = "Section",
    Paragraph = "Paragraph",
    Table = "Table",
    TableRow = "TableRow",
    TableCell = "TableCell",
    Text = "Text",
    Drawing = "Drawing"
}

export interface Property {
    section_property?: SectionProperty;
    paragraph_property?: ParagraphProperty;
    run_property?: RunProperty;
    table_property?: TableProperty;
    table_row_property?: TableRowProperty;
    table_cell_property?: TableCellProperty;
    drawing_property?: DrawingProperty;
}

export interface SectionProperty {
    page_size?: PageSize;
    page_margins?: PageMargins;
}

export interface PageSize {
    width: number;
    height: number;
    orientation?: PageOrientation;
}

export interface PageOrientation {
    orientation: "PAGE_ORIENTATION_PORTRAIT" | "PAGE_ORIENTATION_LANDSCAPE" | "PAGE_ORIENTATION_UNSPECIFIED";
}

export interface PageMargins {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface ParagraphProperty {
    number_property?: NumberProperty;
    spacing?: Spacing;
    indent?: Indent;
    alignment_type?: AlignmentType;
    text_direction?: TextDirection;
}

export interface NumberProperty {
    nesting_level: number;
    number_id: string;
}

export interface Spacing {
    before?: number;
    after?: number;
    line?: number;
    line_rule?: LineSpacingRule;
}

export enum LineSpacingRule {
    AUTO = "LINE_SPACING_RULE_AUTO",
    EXACT = "LINE_SPACING_RULE_EXACT",
    AT_LEAST = "LINE_SPACING_RULE_AT_LEAST",
    UNSPECIFIED = "PAGE_ORIENTATION_UNSPECIFIED" // Note: User text had a copy-paste error here, listing PAGE_ORIENTATION_UNSPECIFIED
}

export interface Indent {
    left?: number;
    left_chars?: number;
    right?: number;
    right_chars?: number;
    hanging?: number;
    hanging_chars?: number;
    first_line?: number;
    first_line_chars?: number;
}

export enum AlignmentType {
    UNSPECIFIED = "ALIGNMENT_TYPE_UNSPECIFIED",
    CENTER = "ALIGNMENT_TYPE_CENTER",
    BOTH = "ALIGNMENT_TYPE_BOTH", // Justified
    DISTRIBUTE = "ALIGNMENT_TYPE_DISTRIBUTE",
    LEFT = "ALIGNMENT_TYPE_LEFT",
    RIGHT = "ALIGNMENT_TYPE_RIGHT"
}

export enum TextDirection {
    UNSPECIFIED = "TEXT_DIRECTION_UNSPECIFIED",
    RTL = "TEXT_DIRECTION_RIGHT_TO_LEFT",
    LTR = "TEXT_DIRECTION_LEFT_TO_RIGHT"
}

export interface RunProperty {
    font?: string;
    bold?: boolean;
    italics?: boolean;
    underline?: boolean;
    strike?: boolean;
    color?: string; // RRGGBB
    spacing?: number;
    size?: number; // half-points
    shading?: Shading;
    vertical_align?: TextVerticalAlign;
    is_placeholder?: boolean;
}

export interface Shading {
    foreground_color: string; // RRGGBB
    background_color: string; // RRGGBB
}

export enum TextVerticalAlign {
    UNSPECIFIED = "RUN_VERTICAL_ALIGN_UNSPECIFIED",
    BASELINE = "RUN_VERTICAL_ALIGN_BASELINE",
    SUPER_SCRIPT = "RUN_VERTICAL_ALIGN_SUPER_SCRIPT",
    SUB_SCRIPT = "RUN_VERTICAL_ALIGN_SUB_SCRIPT"
}

export interface TableProperty {
    table_width?: TableWidth;
    horizontal_alignment_type?: TableHorizontalAlignmentType;
    table_layout?: TableLayoutType;
}

export interface TableWidth {
    width: number;
    type: TableWidthType;
}

export enum TableHorizontalAlignmentType {
    UNSPECIFIED = "TABLE_HORIZONTAL_ALIGNMENT_TYPE_UNSPECIFIED",
    CENTER = "TABLE_HORIZONTAL_ALIGNMENT_TYPE_CENTER",
    LEFT = "TABLE_HORIZONTAL_ALIGNMENT_TYPE_LEFT",
    START = "TABLE_HORIZONTAL_ALIGNMENT_TYPE_START"
}

export enum TableLayoutType {
    UNSPECIFIED = "TABLE_LAYOUT_TYPE_UNSPECIFIED",
    FIXED = "TABLE_LAYOUT_TYPE_FIXED",
    AUTO_FIT = "TABLE_LAYOUT_TYPE_AUTO_FIT"
}

export enum TableWidthType {
    UNSPECIFIED = "TABLE_LAYOUT_TYPE_UNSPECIFIED",
    FIXED = "TABLE_LAYOUT_TYPE_FIXED",
    AUTO_FIT = "TABLE_LAYOUT_TYPE_AUTO_FIT"
}

export interface TableRowProperty {
    is_header?: boolean;
}

export interface TableCellProperty {
    table_cell_borders?: Borders;
    vertical_alignment?: VerticalAlignment;
}

export interface Borders {
    top?: BorderProperty;
    left?: BorderProperty;
    bottom?: BorderProperty;
    right?: BorderProperty;
}

export interface BorderProperty {
    color: string; // RRGGBB
    width: number;
}

export enum VerticalAlignment {
    UNSPECIFIED = "VERTICAL_ALIGNMENT__UNSPECIFIED",
    TOP = "VERTICAL_ALIGNMENT_TOP",
    CENTER = "VERTICAL_ALIGNMENT_CENTER",
    BOTH = "VERTICAL_ALIGNMENT_BOTH",
    BOTTOM = "VERTICAL_ALIGNMENT_BOTTOM"
}

export interface DrawingProperty {
    inline_keyword?: Inline;
    anchor?: Anchor;
    is_placeholder?: boolean;
}

export interface Inline {
    picture?: InlinePicture;
    addon?: InlineAddon;
}

export interface InlinePicture {
    uri: string;
    relative_rect?: RelativeRect;
    shape?: ShapeProperties;
}

export interface RelativeRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

export interface ShapeProperties {
    transform?: Transform2D;
}

export interface Transform2D {
    extent?: PositiveSize2D;
    rotation?: number;
}

export interface PositiveSize2D {
    cx: number;
    cy: number;
}

export interface InlineAddon {
    addon_id: string;
    addon_source: AddonSourceType;
}

export enum AddonSourceType {
    UNSPECIFIED = "ADDON_SOURCE_TYPE_UNSPECIFIED",
    NONE = "ADDON_SOURCE_TYPE_NONE",
    LATEX = "ADDON_SOURCE_TYPE_LATEX",
    SIGN = "ADDON_SOURCE_TYPE_SIGN",
    SIGN_BAR = "ADDON_SOURCE_TYPE_SIGN_BAR"
}

export interface Anchor {
    picture?: AnchorPicture;
}

export interface AnchorPicture {
    uri: string;
    relative_rect?: RelativeRect;
    shape?: ShapeProperties;
    position_horizontal?: PositionHorizontal;
    position_vertical?: PositionVertical;
    wrap_none?: boolean;
    wrap_square?: WrapSquare;
    wrap_top_and_bottom?: boolean;
    behind_doc?: boolean;
    allow_overlap?: boolean;
}

export interface PositionHorizontal {
    pos_offset: number;
    relative_from: RelativeFromHorizontal;
}

export enum RelativeFromHorizontal {
    UNSPECIFIED = "RELATIVE_FROM_HORIZONTAL_UNSPECIFIED",
    MARGIN = "RELATIVE_FROM_HORIZONTAL_MARGIN",
    PAGE = "RELATIVE_FROM_HORIZONTAL_PAGE",
    COLUMN = "RELATIVE_FROM_HORIZONTAL_COLUMN",
    CHARACTER = "RELATIVE_FROM_HORIZONTAL_CHARACTER",
    LEFT_MARGIN = "RELATIVE_FROM_HORIZONTAL_LEFT_MARGIN",
    RIGHT_MARGIN = "RELATIVE_FROM_HORIZONTAL_RIGHT_MARGIN",
    INSIDE_MARGIN = "RELATIVE_FROM_HORIZONTAL_INSIDE_MARGIN",
    OUTSIDE_MARGIN = "RELATIVE_FROM_HORIZONTAL_OUTSIDE_MARGIN"
}

export interface PositionVertical {
    pos_offset: number;
    relative_from: RelativeFromVertical;
}

export enum RelativeFromVertical {
    UNSPECIFIED = "RELATIVE_FROM_VERTICAL_UNSPECIFIED",
    MARGIN = "RELATIVE_FROM_VERTICAL_MARGIN",
    PAGE = "RELATIVE_FROM_VERTICAL_PAGE",
    PARAGRAPH = "RELATIVE_FROM_VERTICAL_PARAGRAPH",
    LINE = "RELATIVE_FROM_VERTICAL_LINE",
    TOP_MARGIN = "RELATIVE_FROM_VERTICAL_TOP_MARGIN",
    BOTTOM_MARGIN = "RELATIVE_FROM_VERTICAL_BOTTOM_MARGIN",
    INSIDE_MARGIN = "RELATIVE_FROM_VERTICAL_INSIDE_MARGIN",
    OUTSIDE_MARGIN = "RELATIVE_FROM_VERTICAL_OUTSIDE_MARGIN"
}

export interface WrapSquare {
    wrap_text: WrapText;
}

export enum WrapText {
    UNSPECIFIED = "WRAP_TEXT_BOTH_UNSPECIFIED",
    BOTH_SIDES = "WRAP_TEXT_BOTH_SIDES",
    LEFT = "WRAP_TEXT_LEFT",
    RIGHT = "WRAP_TEXT_RIGHT",
    LARGEST = "WRAP_TEXT_LARGEST"
}


// --- Update Requests ---

export interface Location {
    index: number;
}

export interface Range {
    start_index: number;
    length: number;
}

export interface ReplaceTextRequest {
    text: string;
    ranges: Range[];
}

export interface InsertTextRequest {
    text: string;
    location: Location;
}

export interface DeleteContentRequest {
    range: Range;
}

export interface InsertImageRequest {
    image_id: string;
    location: Location;
    width?: number;
    height?: number;
}

export interface InsertPageBreakRequest {
    location: Location;
}

export interface InsertTableRequest {
    rows: number;
    cols: number;
    location: Location;
}

export interface InsertParagraphRequest {
    location: Location;
}

export interface TextProperty {
    bold?: boolean;
    italics?: boolean; // User text says "italics", Schema says "italic". User text for RunProperty says "italics", UpdateTextProperty example says "bold" but doesn't list italics explicitly in example, but RunProperty does. Standard WeCom API is "italics"? My schema says "italic". I will use "italics" as per user provided text for RunProperty, but UpdateTextProperty might differ.
    // User text for TextProperty example: bold, color, background_color.
    // RunProperty has "italics".
    // I will check the user provided TextProperty definition again.
    // "blod" (typo in user text), color, background_color.
    // It doesn't list italics in TextProperty section, but RunProperty does.
    // I will support what is likely correct.
    underline?: boolean;
    strikethrough?: boolean;
    color?: string;
    background_color?: string;
    font_size?: number;
}

export interface UpdateTextPropertyRequest {
    text_property: TextProperty;
    ranges: Range[];
}

export interface UpdateRequest {
    replace_text?: ReplaceTextRequest;
    insert_text?: InsertTextRequest;
    delete_content?: DeleteContentRequest;
    insert_image?: InsertImageRequest;
    insert_page_break?: InsertPageBreakRequest;
    insert_table?: InsertTableRequest;
    insert_paragraph?: InsertParagraphRequest;
    update_text_property?: UpdateTextPropertyRequest;
}

export interface BatchUpdateDocResponse {
    errcode: number;
    errmsg: string;
}

export interface GetDocContentResponse {
    errcode: number;
    errmsg: string;
    version: number;
    document: Node;
}
